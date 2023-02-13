export default defineNuxtPlugin(async () => {
  const route = useRoute();
  const path = decodeURIComponent(route.path);
  const { getNavigationStateFromRoute, activeNavigationItem, getIndexRoute } =
    useNavigationData();
  const { config: localeConfig } = useLocale();
  // "/" does not exist in the navigation tree, so we first need to figure out the mapped route and then navigate to it.
  if (path === "/") {
    navigateTo({
      path: await getIndexRoute(),
      hash: route.hash,
      query: route.query,
    });
    return;
  }

  try {
    // Deeplink usecase
    if (!localeConfig.value.activeLocale || !activeNavigationItem.value) {
      await getNavigationStateFromRoute(path);
    }
  } catch (_error: unknown) {
    // Theoretically this does not have to mean that the page does not exist.
    // It could also be a 500 server error or something completely different...
    throw createError({ statusCode: 404, statusMessage: "Page not found" });
  }
});
