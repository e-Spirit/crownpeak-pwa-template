import TPP_SNAP from "fs-tpp-api";
import { FSXAProxyApi } from "fsxa-api";

// TODO (?): Move those types to the fsxa-api
export type CaaSEventType = "insert" | "replace" | "delete";

export type CaaSEvent = {
  operationType: CaaSEventType;
  documentKey: { _id: string };
};

export const onInit = () =>
  new Promise((resolve, reject) => {
    TPP_SNAP.onInit((success: boolean) => {
      if (!success) reject(new Error("onInit failed"));
      resolve(success);
    });
  });

export const waitForPreviewId = (
  fsxaApi: FSXAProxyApi,
  previewId: string,
  timeout = 2000
) =>
  new Promise((resolve) => {
    const caasEvents = fsxaApi.connectEventStream();

    caasEvents.addEventListener("message", ({ data }: MessageEvent) => {
      const { documentKey }: CaaSEvent = JSON.parse(data);
      if (documentKey._id === previewId) {
        caasEvents.close();
        resolve(true);
      }
    });

    setTimeout(() => {
      caasEvents.close();
      resolve(false);
    }, timeout);
  });

export const navigateToPageId = async (pageId: string) => {
  const { $fsxaApi } = useNuxtApp();
  const { activeLocale } = useLocale();
  const router = useRouter();
  await waitForPreviewId($fsxaApi, pageId);

  const { navigationData, setActiveNavigationItem } = useNavigationData();

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
