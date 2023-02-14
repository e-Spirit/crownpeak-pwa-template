import { NavigationData, NavigationItem } from "fsxa-api";

export function useNavigationData() {
  const navigationData = useState<NavigationData | null>("navigationData");

  const { config: localeConfig, setLocale } = useLocale();
  const { $fsxaApi } = useNuxtApp();
  const activeNavigationItem = useState<NavigationItem | undefined>(
    "activeNavigationItem"
  );

  function findNavItemByRoute(route: string) {
    // find navigation item in navigation by seo route
    if (!navigationData.value) return;
    const navItemId = navigationData.value.seoRouteMap[route];
    return navItemId ? navigationData.value.idMap[navItemId] : undefined;
  }

  return {
    activeNavigationItem,
    setActiveNavigationItem: (item: NavigationItem) => {
      activeNavigationItem.value = item;
    },

    getNavigationStateFromRoute: async (route: string) => {
      const item =
        findNavItemByRoute(route) ||
        (await fetchNavigationItemFromRoute($fsxaApi, route));
      const locale = getLocaleFromNavigationItem(item);

      setLocale(locale);
      activeNavigationItem.value = item;
    },
    getIndexRoute: async () => {
      if (!navigationData.value) {
        navigationData.value = await fetchTopLevelNavigation(
          $fsxaApi,
          localeConfig.value.activeLocale ?? localeConfig.value.defaultLocale
        );
      }

      return navigationData.value?.pages?.index;
    },
    navigationData,
  };
}
