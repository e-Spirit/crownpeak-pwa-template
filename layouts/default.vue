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
const { currentDataset } = useContent();
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

    if (!nextNavigationItem)
      throw createError({ statusCode: 404, message: "Page not found" });

    const nextRouteRegex = nextNavigationItem?.seoRouteRegex;
    // The route we need to redirect to, if we need to redirect at all
    let nextRoute = nextNavigationItem?.seoRoute;

    const isProjection = nextRouteRegex !== null;

    // Content Projections have the same page id, and equal seoRoutes, while having different _actual_ routes.
    // Therefore, to check if we need to change the route, we need to check if the seoRouteRegex is different instead.
    // If it did change, we cant just use the seoRoute of the new navigationItem, because multiple projections share it.
    // Instead, we need to fetch the current dataset in the new locale and get the route from there.
    if (isProjection && currentDataset.value) {
      const { dataset, route } = await getTranslatedRouteFromNavItem(
        $fsxaApi,
        nextNavigationItem?.id,
        currentDataset.value?.id,
        activeLocale.value as string
      );
      currentDataset.value = dataset;
      nextRoute = route;
    }

    // Only redirect if something actually changed
    // This is necessary because this code path is called on the layout render as well as when the language changes
    if (
      (!isProjection && nextRoute !== previousRoute) ||
      (isProjection && nextRouteRegex !== previousRouteRegex)
    ) {
      router.push({
        path: nextRoute,
        query,
        hash,
      });
    }
  },
  // automatically refetch if locale changes
  { watch: [activeLocale] }
);
</script>
