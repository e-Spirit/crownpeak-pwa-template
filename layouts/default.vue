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
const { activeLocale } = useLocale();
const { $fsxaApi } = useNuxtApp();
const { projectProperties } = useProjectProperties();
const { navigationData, activeNavigationItem } = useNavigationData();

const { pending } = useAsyncData(
  async () => {
    if (!activeLocale.value || !activeNavigationItem.value)
      throw createError({
        statusCode: 500,
        message: "Routing error: locale or navigation item undefined",
      });

    // fetch project properties
    projectProperties.value = await $fsxaApi.fetchProjectProperties({
      locale: activeLocale.value,
    });

    // fetch top level navigation
    navigationData.value = await fetchTopLevelNavigation(
      $fsxaApi,
      activeLocale.value
    );

    // Redirect to new route if language changed (e.g. from /Startseite/ to /Home/)
    const router = useRouter();
    const { path: previousRoute, query, hash } = useRoute();

    const currentRoute =
      navigationData.value?.idMap[activeNavigationItem.value.id]?.seoRoute;

    if (!currentRoute) {
      router.push(navigationData.value?.pages.index ?? "/");
      return;
    }

    if (previousRoute !== currentRoute) {
      router.push({
        path: currentRoute,
        query,
        hash,
      });
    }
  },
  // automatically refetch if locale changes
  { watch: [activeLocale] }
);
</script>
