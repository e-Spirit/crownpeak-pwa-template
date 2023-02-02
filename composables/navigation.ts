import { NavigationData, NavigationItem } from "fsxa-api";

export function useNavigationData() {
  const navigationData = useState<NavigationData | null>("navigationData");

  const { config: localeConfig, setLocale } = useLocale();
  const { $fsxaApi } = useNuxtApp();
  const activeNavigationItem = useState<NavigationItem | undefined>(
    "activeNavigationItem"
  );

  useAsyncData(
    async () => {
      if (!localeConfig.value.activeLocale) return;

      const data = await fetchTopLevelNavigation(
        $fsxaApi,
        localeConfig.value.activeLocale
      );
      if (data) navigationData.value = data;
    },
    { watch: [localeConfig] }
  );

  return {
    activeNavigationItem,
    setActiveNavigationItem: (item: NavigationItem) => {
      activeNavigationItem.value = item;
    },
    getNavigationStateFromRoute: async (route: string) => {
      const item = await fetchNavigationItemFromRoute($fsxaApi, route);
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
