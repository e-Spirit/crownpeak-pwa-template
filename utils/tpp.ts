import TPP_SNAP from 'fs-tpp-api'
import { FSXAProxyApi } from 'fsxa-api'

export type CaaSEventType = 'insert' | 'replace' | 'delete'

export type CaaSEvent = {
  operationType: CaaSEventType
  documentKey: { _id: string }
}

/**
 * Promisify the onInit event of TPP_SNAP
 * @returns Promise that resolves to true if the TPP Snap is initialized, false if the timeout was reached
 */
export const onInit = () =>
  new Promise((resolve) => {
    TPP_SNAP.onInit((success: boolean) => {
      resolve(success)
    })
  })

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
    const caasEvents = fsxaApi.connectEventStream()

    caasEvents.addEventListener('message', ({ data }: MessageEvent) => {
      const { documentKey }: CaaSEvent = JSON.parse(data)
      if (documentKey._id === previewId) {
        caasEvents.close()
        resolve(true)
      }
    })

    setTimeout(() => {
      // WebSockets can be flaky, this does not necessarily mean that the content was not updated
      caasEvents.close()
      resolve(false)
    }, timeout)
  })

/**
 * navigate to the given pageId by using the navigationData or by fetching the route and redirecting
 * @param pageId PageId to navigate to
 */
export const navigateToPageId = async (pageId: string) => {
  const { $fsxaApi } = useNuxtApp()
  const { activeLocale } = useLocale()
  const router = useRouter()
  await waitForPreviewId($fsxaApi, pageId)

  const { navigationData, setActiveNavigationItem } = useNavigationData()

  const page = navigationData.value?.idMap[pageId]

  if (page) {
    setActiveNavigationItem(page)
    router.push(page.seoRoute)
  } else {
    router.push(
      (await fetchPageRoute($fsxaApi, activeLocale.value!, pageId)) ?? '/'
    )
  }
}

// All of the following functions are event handlers that are passed to the TPP_SNAP library in 3.tpp.client.ts
// You can override them if you want to implement custom behaviour

/**
 * onRequestPreviewElement is called if you e.g. click on a result in the search results
 * https://docs.e-spirit.com/tpp/snap/#onrequestpreviewelementhandler
 * @param previewId requested previewId
 * @returns Promise
 */
export const onRequestPreviewElementHandler: OnRequestPreviewElementHandler =
  async (previewId: string) => {
    const pageId = previewId.split('.')[0]
    if (!pageId) return

    TPP_SNAP.setPreviewElement(previewId)

    await navigateToPageId(pageId)
  }

/**
 * onRerenderView is called if content changed and you do not have the onContentChange event handler implemented
 * The previewId can be for a dataset or a page.
 * https://docs.e-spirit.com/tpp/snap/#onrerenderviewhandler
 * @returns Promise
 */
export const onRerenderViewHandler: OnRerenderViewHandler = async () => {
  const previewId: string | undefined = await TPP_SNAP.getPreviewElement()
  if (!previewId) return

  const [pageId, locale] = previewId.split('.')

  if (!pageId || !locale) return

  const { $fsxaApi } = useNuxtApp()
  const { activeNavigationItem } = useNavigationData()

  // Wait for the CaaS to update the content
  await waitForPreviewId($fsxaApi, previewId)
  const { currentPage, currentDataset } = useContent()

  // If our current page is a dataset, we need to fetch the dataset instead of the page
  if (activeNavigationItem.value?.seoRouteRegex !== null) {
    currentDataset.value = await fetchDatasetById($fsxaApi, pageId, locale)
  } else {
    currentPage.value = await fetchPageById($fsxaApi, pageId, locale)
  }
}

/**
 * onNavigationChange is called if anything in the navigation structure changed, e.g. a page was created or deleted
 *  https://docs.e-spirit.com/tpp/snap/#onnavigationchangehandler
 * @param newPagePreviewId  previewId of the new page or null if no new page was created
 * @returns Promise
 */
export const onNavigationChangeHandler: OnNavigationChangeHandler = (
  newPagePreviewId: string | null
) => {
  // If a new page is created, onRequestPreviewElement is also triggered and will handle the navigation
  if (newPagePreviewId) return

  // For anything else, just reloading is fine. If the page you are currently on was deleted, you will be redirected to the 404 page.
  location.reload()
}
