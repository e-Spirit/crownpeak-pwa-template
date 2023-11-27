<template>
  <div :data-preview-id="previewId">
    <ClientOnly>
      <AppLayoutLoading v-if="pending" />
    </ClientOnly>
    <component
      :is="pageLayoutComponent"
      v-if="currentPage"
      :page="currentPage"
    />
  </div>
</template>

<script setup lang="ts">
const {
  currentPage,
  currentDataset,
  addToCachedPages,
  addToCachedDatasets,
  findCachedPageByRoute,
  findCachedDatasetByRoute
} = useContent()
const { $createContentApi, $setPreviewId, $logger } = useNuxtApp()
const fsxaApi = $createContentApi()
const { activeLocale, fetchAvailableLocales } = useLocale()
const { activeNavigationItem } = useNavigationData()
const currentRoute = decodeURIComponent(useRoute().path)

const previewId = computed(() => {
  return activeNavigationItem.value?.seoRouteRegex !== null
    ? currentDataset.value?.previewId
    : currentPage.value?.previewId
})

// fetch page and dataset
const { pending } = useAsyncData(async () => {
  // This state should not be possible.
  // The middleware should have figured out both the locale and our current navigation item
  if (!activeNavigationItem.value || !activeLocale.value) {
    $logger.error(
      'The middleware could not determine the navigation state for this route.',
      currentRoute,
      'Navigation item: ',
      activeNavigationItem.value,
      'Locale: ',
      activeLocale.value
    )
    throw new Error('No navigation item or locale found')
  }

  const { caasDocumentId, seoRouteRegex } = activeNavigationItem.value
  const isContentProjection = seoRouteRegex !== null
  let pageId = caasDocumentId

  // for content projections we need to get the dataset first
  if (isContentProjection) {
    $logger.info('On content projection')
    // get dataset
    currentDataset.value = findCachedDatasetByRoute(currentRoute) || null
    if (!currentDataset.value) {
      $logger.info(
        'Dataset not cached yet. Trying to fetch dataset with fsxa api'
      )
      currentDataset.value = await fetchDatasetByRoute(
        fsxaApi,
        currentRoute,
        activeLocale.value
      )

      if (!currentDataset.value) {
        $logger.error('Dataset could not be fetched!')
        // Although it is recommended to use createError instead, there is a bug that prevents createError from triggering the error page
        // https://github.com/nuxt/nuxt/issues/15432
        throw showError({
          statusMessage: 'Dataset not found',
          statusCode: 404
        })
      }
      addToCachedDatasets(currentRoute, currentDataset.value)
    }
    // get pageRefId from dataset
    const firstRoute = currentDataset.value.routes?.[0]
    $logger.debug(JSON.stringify(currentDataset.value, null, 2))

    if (!firstRoute) {
      $logger.error('Dataset has no matching route')
      throw showError({
        statusMessage: 'Dataset has no matching route',
        statusCode: 404
      })
    }
    pageId = firstRoute.pageRef
  }

  // get page data
  currentPage.value = findCachedPageByRoute(currentRoute) || null
  if (!currentPage.value) {
    $logger.info('Page data not cached yet. Trying to fetch with fsxa api...')
    currentPage.value = await fetchPageById(fsxaApi, pageId, activeLocale.value)
    if (currentPage.value) {
      addToCachedPages(currentRoute, currentPage.value)
    } else {
      $logger.error('Page could not be fetched!')
      throw showError({
        statusMessage: 'Page not found',
        statusCode: 404
      })
    }
  }

  // Only available on client side and only relevant if preview mode is enabled
  // This enables the synchronization of the editor with the actual page
  if ($setPreviewId)
    $setPreviewId(
      currentDataset.value?.previewId ?? currentPage.value?.previewId
    )
})

// dynamic layout component
const pageLayoutComponent = computed(() => {
  switch (currentPage.value?.layout) {
    case 'homepage':
      return resolveComponent('PageLayoutHome')
    case 'standard':
      return resolveComponent('PageLayoutStandard')
    default:
      return resolveComponent('Unknown')
  }
})

// meta tags
useHead({
  title: currentPage.value?.data['pt_title']
})

// this request will fetch the available locales and set the active locale
fetchAvailableLocales()
</script>
