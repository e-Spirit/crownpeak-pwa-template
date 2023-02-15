export default defineNuxtRouteMiddleware(async (to) => {
  const { activeLocale } = useLocale();

  const route = decodeURIComponent(to.path);
  const { getNavigationStateFromRoute, activeNavigationItem, getIndexRoute } =
    useNavigationData();

  // "/" does not exist in the navigation tree, so we first need to figure out the mapped route and then navigate to it.
  if (route === "/") {
    return navigateTo({
      path: await getIndexRoute(),
      hash: to.hash,
      query: to.query,
    });
  }

  try {
    // Deeplink usecase
    if (
      !activeLocale.value ||
      !activeNavigationItem.value ||
      activeNavigationItem.value.seoRoute !== route
    ) {
      await getNavigationStateFromRoute(route);
    }
  } catch (_error: unknown) {
    // Theoretically this does not have to mean that the page does not exist.
    // It could also be a 500 server error or something completely different...
    throw createError({
      statusCode: 404,
      message: "Page not found",
      fatal: true,
    });
  }

  return true;
});
