<template>
  <div class="flex min-h-screen flex-col">
    <ClientOnly>
      <AppLayoutLoading v-if="pending" />
    </ClientOnly>

    <AppLayoutHeader />
    <div class="container relative mx-auto flex-grow">
      <slot />
    </div>
    <AppLayoutFooter />
  </div>
</template>

<script setup lang="ts">
const { config: localeConfig } = useLocale();
const { $fsxaApi } = useNuxtApp();
const { projectProperties } = useProjectProperties();
const { navigationData, activeNavigationItem } = useNavigationData();

const { pending } = useAsyncData(
  async () => {
    if (!localeConfig.value.activeLocale)
      throw createError({
        statusCode: 500,
        message: "No locale found",
      });

    // fetch project properties
    projectProperties.value = await $fsxaApi.fetchProjectProperties({
      locale: localeConfig.value.activeLocale,
    });

    // fetch top level navigation
    navigationData.value = await fetchTopLevelNavigation(
      $fsxaApi,
      localeConfig.value.activeLocale
    );

    // Redirect to new route if language changed (e.g. from /Startseite/ to /Home/)
    const activeNavigationItemId = activeNavigationItem.value?.id;
    if (!activeNavigationItemId) return;

    const router = useRouter();
    const seoRoute =
      navigationData.value?.idMap[activeNavigationItemId]?.seoRoute;

    if (!seoRoute) {
      router.push(navigationData.value?.pages.index ?? "/");
      return;
    }

    if (router.currentRoute.value.path !== seoRoute) {
      router.push({
        path: seoRoute,
        query: router.currentRoute.value.query,
        hash: router.currentRoute.value.hash,
      });
    }
  },
  // automatically refetch if locale changes
  { watch: [localeConfig] }
);
</script>
