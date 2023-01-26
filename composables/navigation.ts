import { NavigationData } from "fsxa-api/dist/types";

export function useNavigationData() {
  const navigationData = useState<NavigationData | null>("navigationData");

  const { config: localeConfig } = useLocale();
  const { $fsxaApi } = useNuxtApp();

  useAsyncData(
    async () => {
      if (!localeConfig.value.activeLocale) return;

      const data = await $fsxaApi.fetchNavigation({
        locale: localeConfig.value.activeLocale,
      });

      if (data) navigationData.value = data;
    },
    { watch: [localeConfig] }
  );

  return {
    navigationData,
  };
}
