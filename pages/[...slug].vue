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
const { currentPage, addToCache, findCachedPageBySeoRoute } = useContent();
const { $fsxaApi } = useNuxtApp();
const { activeLocale } = useLocale();
const { activeNavigationItem } = useNavigationData();

// fetch page content
const { pending } = useAsyncData(async () => {
  // This state should not be possible.
  // The middleware should have figured out both the locale and our current navigation item
  if (!activeNavigationItem.value || !activeLocale.value)
    throw new Error("No navigation item found");

  const cachedContent = findCachedPageBySeoRoute(
    activeNavigationItem.value.seoRoute
  );
  if (cachedContent) {
    currentPage.value = cachedContent;
  } else {
    currentPage.value = await fetchContentFromNavigationItem(
      $fsxaApi,
      activeNavigationItem.value,
      activeLocale.value
    );
    addToCache(activeNavigationItem.value.seoRoute, currentPage.value);
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
