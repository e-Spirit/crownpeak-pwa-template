import { FSXAContentMode } from "fsxa-api";
import TPP_SNAP from "fs-tpp-api";
import {
  onNavigationChangeHandler,
  onRequestPreviewElementHandler,
  onRerenderViewHandler,
} from "~~/utils/tpp";

/**
 * Nuxt plugin that initializes the TPP Snap, only works if you are in the FirstSpirit editor and if the environment variable FSXA_MODE is set to "preview"
 */
export default defineNuxtPlugin(() => {
  const {
    public: { mode },
  } = useRuntimeConfig();

  // Set by environment variable
  if (mode !== FSXAContentMode.PREVIEW) return;

  TPP_SNAP.isConnected.then(async (_isConnected: boolean) => {
    const initialized = await onInit();

    if (!initialized) return;

    // onRequestPreviewElement is called if you e.g. click on a result in the search results
    // https://docs.e-spirit.com/tpp/snap/#onrequestpreviewelementhandler
    TPP_SNAP.onRequestPreviewElement(onRequestPreviewElementHandler);

    // onRerenderView is called if content changed and you do not have the onContentChange event handler implemented
    // The previewId can be for a dataset or a page.
    // https://docs.e-spirit.com/tpp/snap/#onrerenderviewhandler
    TPP_SNAP.onRerenderView(onRerenderViewHandler);

    // onNavigationChange is called if anything in the navigation structure changed, e.g. a page was created or deleted
    // https://docs.e-spirit.com/tpp/snap/#onnavigationchangehandler
    TPP_SNAP.onNavigationChange(onNavigationChangeHandler);
  });

  return {
    provide: {
      /**
       * Used by the actual page to set the current previewId, allowing the synchronization of the page with the editor
       * For example, if you change the language in the page, the previewId will be updated and the editor will show the correct language as well
       * @param previewId preview id of the current dataset or page
       */
      setPreviewId: async (previewId: string | undefined) => {
        if (await TPP_SNAP.isConnected) TPP_SNAP.setPreviewElement(previewId);
      },
      /**
       *  Used by the add section component to create a new section
       *  https://docs.e-spirit.com/tpp/snap/#tpp_snapcreatesection`
       * @param bodyName name attribute of the pageBody
       */
      createSection: async (bodyName: string) => {
        const previewId: string | undefined =
          await TPP_SNAP.getPreviewElement();
        if (!previewId) return;

        return TPP_SNAP.createSection(previewId, { body: bodyName });
      },
    },
  };
});
