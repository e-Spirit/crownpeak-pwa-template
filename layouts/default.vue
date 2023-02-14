<template>
  <div class="flex min-h-screen flex-col">
    <ClientOnly>
      <AppLayoutLoading v-if="pending" />
    </ClientOnly>

    <AppLayoutHeader />
    <div class="container relative mx-auto flex-grow">
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

const { pending } = useAsyncData(
  async () => {
    if (!localeConfig.value.activeLocale)
      throw createError({
        statusCode: 500,
        message: "No locale found",
      });

    // fetch project properties
    projectProperties.value = await $fsxaApi.fetchProjectProperties({
      locale: localeConfig.value.activeLocale,
    });

    // fetch top level navigation
    navigationData.value = await fetchTopLevelNavigation(
      $fsxaApi,
      localeConfig.value.activeLocale
    );
  },
  // automatically refetch if locale changes
  { watch: [localeConfig] }
);
</script>
