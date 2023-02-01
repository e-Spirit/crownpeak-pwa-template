export function useContent() {
  const { $fsxaApi } = useNuxtApp();
  const { config: localeConfig } = useLocale();
  const { navigationItem } = useNavigationData();

  const data = useAsyncData(
    () => {
      // This state should not be possible.
      // The middleware should have figured out both the locale and our current navigation item
      if (!navigationItem.value || !localeConfig.value.activeLocale)
        throw new Error("No navigation item found");

      return fetchContentFromNavigationItem(
        $fsxaApi,
        navigationItem.value,
        localeConfig.value.activeLocale
      );
    },
    // automatically refetch when the navigation item changes
    { watch: [navigationItem, localeConfig] }
  );

  return data;
}
