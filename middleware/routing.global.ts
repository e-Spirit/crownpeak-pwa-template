export default defineNuxtRouteMiddleware(async (to) => {
  const {
    config: {
      value: { activeLocale },
    },
  } = useLocale();

  const route = decodeURIComponent(to.path);
  const { getNavigationStateFromRoute, navigationItem, getIndexRoute } =
    useNavigationData();

  // "/" does not exist in the navigation tree, so we first need to figure out the mapped route and then navigate to it.
  if (route === "/") {
    return navigateTo(await getIndexRoute());
  }

  try {
    // Deeplink usecase
    if (!activeLocale || !navigationItem.value) {
      await getNavigationStateFromRoute(route);
    }
  } catch (_error: unknown) {
    // Theoretically this does not have to mean that the page does not exist.
    // It could also be a 500 server error or something completely different...
    throw createError({ statusCode: 404, statusMessage: "Page not found" });
  }

  return true;
});
