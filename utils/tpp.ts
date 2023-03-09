import TPP_SNAP from "fs-tpp-api";
import { FSXAProxyApi } from "fsxa-api";

// TODO (?): Move these types to the fsxa-api
export type CaaSEventType = "insert" | "replace" | "delete";

// JSON Schema for the CaaSEvent
export type CaaSEvent = {
  operationType: CaaSEventType;
  documentKey: { _id: string };
};

/**
 * Promisify the onInit event of TPP_SNAP
 * @returns Promise that resolves to true if the TPP Snap is initialized, false if the timeout was reached
 */
export const onInit = () =>
  new Promise((resolve) => {
    TPP_SNAP.onInit((success: boolean) => {
      resolve(success);
    });
  });

/**
 * waitForPreviewId waits for the CaaS to update the content, so that we can fetch the updated content.
 * If you do not wait for the CaaS to update the content, you _might_ get the old content.
 * @param fsxaApi Instance of the FSXA Api
 * @param previewId Element preview id, uuid.de_DE or similar
 * @param timeout Timeout specifies how long to wait for the event before resolving anyway
 * @returns Promise that resolves to true if the previewId was found, false if the timeout was reached
 */
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
      // WebSockets can be flaky, this does not necessarily mean that the content was not updated
      caasEvents.close();
      resolve(false);
    }, timeout);
  });

/**
 * navigate to the given pageId by using the navigationData or by fetching the route and redirecting
 * @param pageId PageId to navigate to
 */
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
