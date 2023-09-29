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
const { activeLocale } = useLocale()
const { setNavigationData, fetchNavigationData } = useNavigationData()
const { $logger } = useNuxtApp()

// This gets called when the layout is loaded or the locale changes
const { pending } = useAsyncData(
  async () => {
    // fetch navigationData
    const navigationData = await fetchNavigationData(activeLocale.value!)
    if (!navigationData) {
      $logger.error(
        'Navigation data could not be fetched for locale: ',
        activeLocale.value
      )
      throw showError({
        message: 'Navigation data could not be fetched',
        statusCode: 500
      })
    }

    setNavigationData(navigationData)
  },
  { watch: [activeLocale] }
)
</script>
