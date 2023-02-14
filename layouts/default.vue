<template>
  <div class="flex min-h-screen flex-col">
    <AppLayoutHeader />
    <div class="container mx-auto flex-grow">
      <slot />
    </div>
    <AppLayoutFooter />
  </div>
</template>

<script setup lang="ts">
const { config: localeConfig } = useLocale();
const { $fsxaApi } = useNuxtApp();
const { projectProperties } = useProjectProperties();
const { navigationData } = useNavigationData();

await useAsyncData(
  async () => {
    // fetch project properties
    if (!localeConfig.value.activeLocale)
      return new Promise((resolve) => resolve(null));
    projectProperties.value = await $fsxaApi.fetchProjectProperties({
      locale: localeConfig.value.activeLocale,
    });
    // fetch top level navigation
    if (!localeConfig.value.activeLocale) return;
    navigationData.value = await fetchTopLevelNavigation(
      $fsxaApi,
      localeConfig.value.activeLocale
    );
  },
  // automatically refetch if locale changes
  { watch: [localeConfig] }
);
</script>
