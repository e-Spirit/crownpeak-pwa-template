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
const { navigationData, activeNavigationItem, fetchTopLevelNavigation } =
  useNavigationData();

// This gets called when the layout is loaded or when the language changes
const { pending } = useAsyncData(
  async () => {
    // This can only happen if the middleware (routing.global.ts) fails silently
    if (!activeLocale.value || !activeNavigationItem.value)
      throw createError({
        statusCode: 500,
        message: "Routing error: locale or navigation item undefined",
      });

    // TODO: move out of here
    // fetch project properties
    projectProperties.value = await $fsxaApi.fetchProjectProperties({
      locale: activeLocale.value,
    });

    const previousRouteRegex = activeNavigationItem.value.seoRouteRegex;

    if (
      !navigationData.value ||
      navigationData.value.meta.identifier.languageId !== activeLocale.value
    )
      await fetchTopLevelNavigation();

    // Redirect to new route if language changed (e.g. from /Startseite/ to /Home/)
    const router = useRouter();
    const { path: previousRoute, query, hash } = useRoute();

    // The navigationData is already fetched for the new language and the activeNavigationItem.id is the same across languages
    // We can use the id to get the new route.
    const nextNavigationItem =
      navigationData.value?.idMap[activeNavigationItem.value.id];

    const nextRoute = nextNavigationItem?.seoRoute;
    const nextRouteRegex = nextNavigationItem?.seoRouteRegex;

    // Content Projections have the same page id, but different routes.
    // Therefore we need to check if the seoRouteRegex matches instead of the seoRoute
    const isProjection = nextRouteRegex !== null;

    if (
      (!isProjection && nextRoute !== previousRoute) ||
      (isProjection && nextRouteRegex !== previousRouteRegex)
    ) {
      router.push({
        path: isProjection ? nextRoute : nextRoute,
        query,
        hash,
      });
    }
  },
  // automatically refetch if locale changes
  { watch: [activeLocale] }
);
</script>
