export default defineNuxtPlugin(async () => {
  const { $fsxaApi } = useNuxtApp();
  const { config: localeConfig } = useLocale();
  const { navigationData, activeNavigationItem, getNavigationStateFromRoute } =
    useNavigationData();
  const { projectProperties } = useProjectProperties();

  const route = decodeURIComponent(useRoute().path);

  // fetch navigation state
  if (!localeConfig.value.activeLocale || !activeNavigationItem.value) {
    await getNavigationStateFromRoute(route);
  }

  // fetch project properties
  await useAsyncData(
    async () => {
      if (!localeConfig.value.activeLocale)
        return new Promise((resolve) => resolve(null));
      projectProperties.value = await $fsxaApi.fetchProjectProperties({
        locale: localeConfig.value.activeLocale,
      });
    },
    { watch: [localeConfig] }
  );

  // fetch navigation data
  await useAsyncData(
    async () => {
      if (!localeConfig.value.activeLocale) return;
      navigationData.value = await fetchTopLevelNavigation(
        $fsxaApi,
        localeConfig.value.activeLocale
      );
    },
    { watch: [localeConfig] }
  );

  const { content } = useContent();
  // fetch page content
  await useAsyncData(
    async () => {
      // This state should not be possible.
      // The middleware should have figured out both the locale and our current navigation item

      if (!activeNavigationItem.value || !localeConfig.value.activeLocale)
        throw new Error("No navigation item found");
      content.value = await fetchContentFromNavigationItem(
        $fsxaApi,
        activeNavigationItem.value,
        localeConfig.value.activeLocale
      );
    },
    // automatically refetch when the navigation item changes
    { watch: [activeNavigationItem, localeConfig] }
  );
});
