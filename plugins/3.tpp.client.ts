import { FSXAContentMode } from "fsxa-api";
import TPP_SNAP from "fs-tpp-api";

export default defineNuxtPlugin(() => {
  const {
    public: { mode },
  } = useRuntimeConfig();

  if (mode !== FSXAContentMode.PREVIEW) return;

  const { $fsxaApi } = useNuxtApp();
  const { activeNavigationItem } = useNavigationData();

  TPP_SNAP.isConnected.then(async (_isConnected: boolean) => {
    await onInit();

    // https://docs.e-spirit.com/tpp/snap/#onrequestpreviewelementhandler
    TPP_SNAP.onRequestPreviewElement(async (previewId: string) => {
      const pageId = previewId.split(".")[0];
      if (!pageId) return;

      TPP_SNAP.setPreviewElement(previewId);

      await navigateToPageId(pageId);
    });

    // https://docs.e-spirit.com/tpp/snap/#onrerenderviewhandler
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

    // https://docs.e-spirit.com/tpp/snap/#onnavigationchangehandler
    TPP_SNAP.onNavigationChange((newPagePreviewId: string | null) => {
      // If a new page is created, onRequestPreviewElement is also triggered and will handle the navigation
      if (newPagePreviewId) return;

      location.reload();
    });
  });

  return {
    provide: {
      setPreviewId: async (previewId: string | undefined) => {
        if (await TPP_SNAP.isConnected) TPP_SNAP.setPreviewElement(previewId);
      },
    },
  };
});
