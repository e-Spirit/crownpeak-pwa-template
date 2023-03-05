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

  if (runtimeConfig.public.mode !== FSXAContentMode.PREVIEW) return;

  const { $fsxaApi } = useNuxtApp();
  const { activeLocale } = useLocale();
  const router = useRouter();
  const { navigationData, setActiveNavigationItem, activeNavigationItem } =
    useNavigationData();

  TPP_SNAP.isConnected.then(async (_isConnected: boolean) => {
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

    TPP_SNAP.onRequestPreviewElement(async (previewId: string) => {
      const pageId = previewId.split(".")[0];
      if (!pageId) return;

      TPP_SNAP.setPreviewElement(previewId);

      await navigateToPageId(pageId);
    });

    TPP_SNAP.onContentChange(
      (_$node: HTMLElement, _previewId: string, _content: unknown) => {
        // pattern-lib macht hier auch nichts und rerendered einfach stumpf die komplette Seite. Ist wahrscheinlich das sinnvollste :D
        // location.reload();
      }
    );

    TPP_SNAP.onRerenderView(async () => {
      const previewId: string | undefined = await TPP_SNAP.getPreviewElement();
      if (!previewId) return;

      const pageId = previewId.split(".")[0];
      const locale = previewId.split(".")[1];

      if (!pageId || !locale) return;

      await waitForPageId($fsxaApi, pageId);
      const { currentPage, currentDataset } = useContent();

      if (activeNavigationItem.value?.seoRouteRegex !== null) {
        currentDataset.value = await fetchDatasetById($fsxaApi, pageId, locale);
      } else {
        currentPage.value = await fetchPageById($fsxaApi, pageId, locale);
      }
    });

    TPP_SNAP.onNavigationChange(async (newPagePreviewId: string | null) => {
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
      setPreviewId: async (previewId: string | undefined) => {
        if (await TPP_SNAP.isConnected) TPP_SNAP.setPreviewElement(previewId);
      },
      getPreviewId: () => {},
    },
  };
});
