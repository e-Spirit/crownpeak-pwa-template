<template>
  <div>
    <ClientOnly>
      <AppLayoutLoading v-if="pending" />
    </ClientOnly>
    <component
      :is="pageLayoutComponent"
      v-if="currentPage"
      :page="currentPage"
    />
    <DevOnly>
      <div class="fixed top-0 right-0 z-30">
        <Dev v-if="currentPage" :content="currentPage" component-name="page" />
      </div>
    </DevOnly>
  </div>
</template>

<script setup lang="ts">
const {
  currentPage,
  currentDataset,
  addToCachedPages,
  addToCachedDatasets,
  findCachedPageByRoute,
  findCachedDatasetByRoute,
} = useContent();
const { $fsxaApi } = useNuxtApp();
const { activeLocale } = useLocale();
const { activeNavigationItem } = useNavigationData();
const currentRoute = decodeURIComponent(useRoute().path);

// fetch page and dataset
const { pending } = useAsyncData(async () => {
  // This state should not be possible.
  // The middleware should have figured out both the locale and our current navigation item
  if (!activeNavigationItem.value || !activeLocale.value)
    throw new Error("No navigation item found");

  const { caasDocumentId, seoRouteRegex } = activeNavigationItem.value;
  const isContentProjection = seoRouteRegex !== null;
  let pageId = caasDocumentId;

  // for content projections we need to get the dataset first
  if (isContentProjection) {
    // get dataset
    currentDataset.value = findCachedDatasetByRoute(currentRoute) || null;
    if (!currentDataset.value) {
      currentDataset.value = await fetchDatasetByRoute(
        $fsxaApi,
        activeLocale.value,
        currentRoute
      );

      if (!currentDataset.value)
        // Although it is recommended to use createError instead, there is a bug that prevents createError from triggering the error page
        // https://github.com/nuxt/nuxt/issues/15432
        throw showError({
          statusMessage: "Dataset not found",
          statusCode: 404,
        });

      addToCachedDatasets(currentRoute, currentDataset.value);
    }
    // get pageRefId from dataset
    const firstRoute = currentDataset.value.routes?.[0];
    if (!firstRoute) throw createError("No route found");
    pageId = firstRoute.pageRef;
  }

  // get page data
  currentPage.value = findCachedPageByRoute(currentRoute) || null;
  if (!currentPage.value) {
    currentPage.value = await fetchPageById(
      $fsxaApi,
      activeLocale.value,
      pageId
    );
    addToCachedPages(currentRoute, currentPage.value);
  }
});

// dynamic layout component
const pageLayoutComponent = computed(() => {
  switch (currentPage.value?.layout) {
    case "homepage":
      return resolveComponent("PageLayoutHome");
    case "standard":
      return resolveComponent("PageLayoutStandard");
    default:
      return resolveComponent("Unknown");
  }
});

// meta tags
useHead({
  title: currentPage.value?.data["pt_title"],
});
</script>
