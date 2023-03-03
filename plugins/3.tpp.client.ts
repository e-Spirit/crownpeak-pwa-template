import { FSXAContentMode, FSXAProxyApi } from "fsxa-api";
import TPP_SNAP from "fs-tpp-api";

// WHY IS THIS NOT IN fsxa-api?
export type CaaSEventType = "insert" | "replace" | "delete";

type CaaSEvent = {
  operationType: CaaSEventType;
  documentKey: { _id: string };
};

const onInit = () =>
  new Promise((resolve, reject) => {
    TPP_SNAP.onInit((success: boolean) => {
      if (!success) reject(new Error("onInit failed"));
      resolve(success);
    });
  });

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const globalPreviewId = useState<string | null>("previewId", () => null);

  if (runtimeConfig.public.mode !== FSXAContentMode.PREVIEW) return;

  const { $fsxaApi } = useNuxtApp();
  const { activeLocale } = useLocale();
  const router = useRouter();
  const { navigationData, setActiveNavigationItem } = useNavigationData();

  TPP_SNAP.isConnected.then(async (isConnected: boolean) => {
    console.log(`isConnected: ${isConnected}`);

    await onInit();

    const waitForPageId = (
      fsxaApi: FSXAProxyApi,
      pageId: string,
      timeout = 2000
    ) =>
      new Promise((resolve) => {
        const caasEvents = fsxaApi.connectEventStream();

        caasEvents.addEventListener("message", ({ data }: MessageEvent) => {
          const { documentKey }: CaaSEvent = JSON.parse(data);
          if (documentKey._id === pageId) {
            caasEvents.close();
            resolve(true);
          }
        });

        setTimeout(() => {
          console.log(
            `timed out waiting for pageId: ${pageId} after ${timeout}ms`
          );
          caasEvents.close();
          resolve(false);
        }, timeout);
      });

    const navigateToPageId = async (pageId: string) => {
      await waitForPageId($fsxaApi, pageId);

      const page = navigationData.value?.idMap[pageId];

      if (page) {
        setActiveNavigationItem(page);
        router.push(page.seoRoute);
      } else {
        router.push(
          (await fetchPageRoute($fsxaApi, activeLocale.value!, pageId)) ?? "/"
        );
      }
    };

    console.log("onInit done");

    TPP_SNAP.onRequestPreviewElement(async (previewId: string) => {
      console.log(`onRequestPreviewElement: ${previewId}`);

      const pageId = previewId.split(".")[0];
      if (!pageId) return;
      globalPreviewId.value = pageId;

      TPP_SNAP.setPreviewElement(previewId);

      await navigateToPageId(pageId);
    });

    TPP_SNAP.onContentChange(
      ($node: HTMLElement, previewId: string, content: unknown) => {
        console.log(`onContentChange: ${previewId}`);
        console.log($node);
        console.log(content);

        // pattern-lib macht hier auch nichts und rerendered einfach stumpf die komplette Seite. Ist wahrscheinlich das sinnvollste :D
        // location.reload();
      }
    );

    TPP_SNAP.onRerenderView(async () => {
      console.log("onRerenderView");

      const previewId: string | undefined = await TPP_SNAP.getPreviewElement();
      if (!previewId) return;

      const pageId = previewId.split(".")[0];
      const locale = previewId.split(".")[1];

      if (!pageId || !locale) return;
      globalPreviewId.value = pageId;

      await waitForPageId($fsxaApi, pageId);
      const { currentPage } = useContent();

      currentPage.value = await fetchPageById($fsxaApi, pageId, locale);
    });

    TPP_SNAP.onNavigationChange(async (newPagePreviewId: string | null) => {
      console.log(`onNavigationChange: ${newPagePreviewId}`);

      if (newPagePreviewId) return navigateToPageId(newPagePreviewId);

      const currentPreviewId = await TPP_SNAP.getPreviewElement();
      if (!currentPreviewId) return;

      const pageId = currentPreviewId.split(".")[0];
      if (!pageId) return;

      await waitForPageId($fsxaApi, pageId);

      location.reload();
    });
  });

  return {
    provide: {
      setPreviewId: async (previewId: string) => {
        if (await TPP_SNAP.isConnected) TPP_SNAP.setPreviewElement(previewId);
      },
      getPreviewId: () => {
        return globalPreviewId.value;
      },
    },
  };
});
