<template>
  <div>
    <ClientOnly>
      <AppLayoutLoading v-if="pending" />
    </ClientOnly>
    <AppLayoutHeader />
    <div>
      <slot />
    </div>
    <ClientOnly>
      <AppLayoutFooter />
    </ClientOnly>
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
