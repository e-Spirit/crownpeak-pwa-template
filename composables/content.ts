export function useContent() {
  const { $fsxaApi } = useNuxtApp();
  const { config: localeConfig } = useLocale();
  const { activeNavigationItem } = useNavigationData();

  const data = useAsyncData(
    () => {
      // This state should not be possible.
      // The middleware should have figured out both the locale and our current navigation item
      if (!activeNavigationItem.value || !localeConfig.value.activeLocale)
        throw new Error("No navigation item found");

      return fetchContentFromNavigationItem(
        $fsxaApi,
        activeNavigationItem.value,
        localeConfig.value.activeLocale
      );
    },
    // automatically refetch when the navigation item changes
    { watch: [activeNavigationItem, localeConfig] }
  );

  return data;
}
