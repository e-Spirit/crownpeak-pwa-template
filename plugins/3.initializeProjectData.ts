export default defineNuxtPlugin(async () => {
  const { $fsxaApi } = useNuxtApp();

  const { projectProperties } = useProjectProperties();
  const { navigationData } = useNavigationData();
  const { config: localeConfig } = useLocale();

  // fetch navigation data
  await useAsyncData(
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

  // fetch project properties
  await useAsyncData(
    async () => {
      if (!localeConfig.value.activeLocale) return;

      const data = await $fsxaApi.fetchProjectProperties({
        locale: localeConfig.value.activeLocale,
      });
      if (data) projectProperties.value = data;
    },
    { watch: [localeConfig] }
  );
});
