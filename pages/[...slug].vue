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

// fetch page content
const { pending } = useAsyncData(async () => {
  // This state should not be possible.
  // The middleware should have figured out both the locale and our current navigation item
  if (!activeNavigationItem.value || !activeLocale.value)
    throw new Error("No navigation item found");

  const currentRoute = decodeURIComponent(useRoute().path);
  const cachedPage = findCachedPageByRoute(currentRoute);
  currentDataset.value = findCachedDatasetByRoute(currentRoute) || null;

  if (cachedPage) {
    currentPage.value = cachedPage;
  } else {
    const { page, dataset } = await fetchContentFromNavigationItem(
      $fsxaApi,
      activeNavigationItem.value,
      activeLocale.value,
      currentRoute,
      currentDataset.value
    );

    currentPage.value = page;
    currentDataset.value = dataset;

    addToCachedPages(currentRoute, currentPage.value);
    if (currentDataset.value)
      addToCachedDatasets(currentRoute, currentDataset.value);
  }
});

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
