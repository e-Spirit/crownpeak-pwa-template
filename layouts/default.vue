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
const { fetchProjectProperties, setProjectProperties } = useProjectProperties()
const { setNavigationData, fetchNavigationData } = useNavigationData()
const { $logger } = useNuxtApp()

// This gets called when the layout is loaded or the locale changes
const { pending } = useAsyncData(
  async () => {
    // fetch project properties
    const projectProperties = await fetchProjectProperties(activeLocale.value!)

    if (!projectProperties) {
      $logger.error(
        'Project properties could not be fetched for locale: ',
        activeLocale.value
      )
      throw showError({
        message: 'Project properties could not be fetched',
        statusCode: 500
      })
    }

    setProjectProperties(projectProperties, activeLocale.value!)

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
