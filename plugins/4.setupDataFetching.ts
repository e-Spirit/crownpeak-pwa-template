export default defineNuxtPlugin(async () => {
  const { $fsxaApi } = useNuxtApp();
  const { config: localeConfig } = useLocale();
  const { navigationData, activeNavigationItem } = useNavigationData();
  const { projectProperties } = useProjectProperties();

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

      // Redirect to new route if language changed (e.g. from /Startseite/ to /Home/)
      const activeNavigationItemId = activeNavigationItem.value?.id;
      if (!activeNavigationItemId) return;

      const router = useRouter();
      const seoRoute =
        navigationData.value?.idMap[activeNavigationItemId]?.seoRoute;

      if (!seoRoute) {
        router.push(navigationData.value?.pages.index ?? "/");
        return;
      }

      if (router.currentRoute.value.path !== seoRoute) {
        router.push(seoRoute);
      }
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
