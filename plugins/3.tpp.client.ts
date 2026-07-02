import {
  onNavigationChangeHandler,
  onRequestPreviewElementHandler,
  onRerenderViewHandler
} from '../utils/tpp'

const loadScript = (
  FILE_URL: string,
  async = true,
  type = 'text/javascript'
) => {
  return new Promise((resolve, reject) => {
    try {
      const scriptElement = document.createElement('script')
      scriptElement.type = type
      scriptElement.async = async
      scriptElement.src = FILE_URL

      scriptElement.addEventListener('load', (_) => {
        resolve({ status: true })
      })

      scriptElement.addEventListener('error', (_: ErrorEvent) => {
        reject({
          status: false,
          message: `Failed to load the script ${FILE_URL}`
        })
      })

      document.body.appendChild(scriptElement)
    } catch (error) {
      reject(error)
    }
  })
}

declare global {
  interface Window {
    TPP_SNAP: any
  }
}

/**
 * Nuxt plugin that initializes the TPP Snap, only works if you are in the FirstSpirit editor and if the environment variable FSXA_MODE is set to "preview"
 */
export default defineNuxtPlugin(() => {
  const { $isPreviewMode } = useNuxtApp()

  if (!$isPreviewMode) return

  console.log(
    '[TPP_SNAP] Initializing TPP Snap plugin, preview mode:',
    $isPreviewMode
  )

  // To prevent console errors during local development,
  // never resolve the promise, if the PWA is `window.top`,
  // No content can be changed outside the ContentCreator!
  if (window.top === window.self) {
    console.warn(
      'You are running your application outside of the ContentCreator. InEdit will not be available.'
    )
    return
  }

  if (typeof window !== 'undefined') {
    if (!!window.location.ancestorOrigins[0]) {
      loadScript(
        window.location.ancestorOrigins[0] + '/fs5webedit/live/live.js'
      )
        .then(() => {
          console.log('OCM loaded successfully')

          return window.TPP_SNAP.isConnected.then(async (_isConnected: boolean) => {
            const initialized = await onInit()

            console.log('[TPP_SNAP] Initialized:', initialized)

            if (!initialized) return

            // onRequestPreviewElement is called if you e.g. click on a result in the search results
            // https://docs.e-spirit.com/tpp/snap/#onrequestpreviewelementhandler
            window.TPP_SNAP.onRequestPreviewElement(
              onRequestPreviewElementHandler
            )

            // onRerenderView is called if content changed and you do not have the onContentChange event handler implemented
            // The previewId can be for a dataset or a page.
            // https://docs.e-spirit.com/tpp/snap/#onrerenderviewhandler
            window.TPP_SNAP.onRerenderView(onRerenderViewHandler)

            // onNavigationChange is called if anything in the navigation structure changed, e.g. a page was created or deleted
            // https://docs.e-spirit.com/tpp/snap/#onnavigationchangehandler
            window.TPP_SNAP.onNavigationChange(onNavigationChangeHandler)
          })
        })
        .catch((err) => {
          console.log('Cannot activate OCM mode: ' + err)
        })
    } else {
      console.log('No referrer found, cannot load OCM mode.')
    }
  }

  return {
    provide: {
      /**
       * Used by the actual page to set the current previewId, allowing the synchronization of the page with the editor
       * For example, if you change the language in the page, the previewId will be updated and the editor will show the correct language as well
       * @param previewId preview id of the current dataset or page
       */
      setPreviewId: async (previewId: string | undefined) => {
        if (!window.TPP_SNAP) return
        if (await window.TPP_SNAP.isConnected)
          window.TPP_SNAP.setPreviewElement(previewId)
      },
      /**
       *  Used by the add section component to create a new section
       *  https://docs.e-spirit.com/tpp/snap/#tpp_snapcreatesection`
       * @param bodyName name attribute of the pageBody
       */
      createSection: async (bodyName: string) => {
        if (!window.TPP_SNAP) return
        const previewId: string | undefined =
          await window.TPP_SNAP.getPreviewElement()
        if (!previewId) return

        return window.TPP_SNAP.createSection(previewId, { body: bodyName })
      }
    }
  }
})
