import { FSXAContentMode } from "fsxa-api";
import TPP_SNAP from "fs-tpp-api";
import { waitForPreviewId } from "~~/utils/tpp";

/**
 * Nuxt plugin that initializes the TPP Snap, only works if you are in the FirstSpirit editor and if the environment variable FSXA_MODE is set to "preview"
 */
export default defineNuxtPlugin(() => {
  const {
    public: { mode },
  } = useRuntimeConfig();

  // Set by environment variable
  if (mode !== FSXAContentMode.PREVIEW) return;

  const { $fsxaApi } = useNuxtApp();
  const { activeNavigationItem } = useNavigationData();

  TPP_SNAP.isConnected.then(async (_isConnected: boolean) => {
    const initialized = await onInit();

    if (!initialized) return;

    // onRequestPreviewElement is called if you e.g. click on a result in the search results
    // https://docs.e-spirit.com/tpp/snap/#onrequestpreviewelementhandler
    TPP_SNAP.onRequestPreviewElement(async (previewId: string) => {
      const pageId = previewId.split(".")[0];
      if (!pageId) return;

      TPP_SNAP.setPreviewElement(previewId);

      await navigateToPageId(pageId);
    });

    // onRerenderView is called if content changed and you do not have the onContentChange event handler implemented
    // The previewId can be for a dataset or a page.
    // https://docs.e-spirit.com/tpp/snap/#onrerenderviewhandler
    TPP_SNAP.onRerenderView(async () => {
      const previewId: string | undefined = await TPP_SNAP.getPreviewElement();
      if (!previewId) return;

      const pageId = previewId.split(".")[0];
      const locale = previewId.split(".")[1];

      if (!pageId || !locale) return;

      // Wait for the CaaS to update the content
      await waitForPreviewId($fsxaApi, previewId);
      const { currentPage, currentDataset } = useContent();

      // If our current page is a dataset, we need to fetch the dataset instead of the page
      if (activeNavigationItem.value?.seoRouteRegex !== null) {
        currentDataset.value = await fetchDatasetById($fsxaApi, pageId, locale);
      } else {
        currentPage.value = await fetchPageById($fsxaApi, pageId, locale);
      }
    });

    // onNavigationChange is called if anything in the navigation structure changed, e.g. a page was created or deleted
    // https://docs.e-spirit.com/tpp/snap/#onnavigationchangehandler
    TPP_SNAP.onNavigationChange((newPagePreviewId: string | null) => {
      // If a new page is created, onRequestPreviewElement is also triggered and will handle the navigation
      if (newPagePreviewId) return;

      // For anything else, just reloading is fine. If the page you are currently on was deleted, you will be redirected to the 404 page.
      location.reload();
    });
  });

  return {
    provide: {
      // Used by the actual page to set the current previewId, allowing the synchronization of the page with the editor
      // For example, if you change the language in the page, the previewId will be updated and the editor will show the correct language as well
      setPreviewId: async (previewId: string | undefined) => {
        if (await TPP_SNAP.isConnected) TPP_SNAP.setPreviewElement(previewId);
      },
      createSection: async (bodyName: string) => {
        // Used by the add section component to create a new section
        // https://docs.e-spirit.com/tpp/snap/#tpp_snapcreatesection`
        const previewId: string | undefined =
          await TPP_SNAP.getPreviewElement();
        if (!previewId) return;

        return TPP_SNAP.createSection(previewId, { body: bodyName });
      },
    },
  };
});
