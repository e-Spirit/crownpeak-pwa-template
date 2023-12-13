<template>
  <div class="group static px-3 py-2 md:relative" data-testid="languageSwitch">
    <button
      class="relative inline-block text-gray-400 hover:text-gray-500"
      title="Language switch"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        ></path>
      </svg>
    </button>

    <div
      class="absolute right-0 top-6 z-50 hidden w-full translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:block group-hover:translate-y-5 group-hover:transform group-hover:opacity-100 md:w-auto"
      data-testid="languagesDropdown"
    >
      <div
        class="relative top-6 z-10 rounded-xl border border-gray-500 bg-white p-6 shadow-xl"
      >
        <ul data-testid="languagesUL">
          <li v-for="locale of allLocales" :key="locale.identifier">
            <button
              :disabled="loading"
              :data-testid="`${locale.identifier}-switch`"
              :data-activeLocale="locale.identifier === activeLocale"
              :class="{
                underline: locale.identifier === activeLocale
              }"
              class="w-full px-4 py-3 hover:bg-gray-200"
              @click="changeLanguage(locale.identifier)"
            >
              {{ locale.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { activeLocale, availableLocales } = useLocale()

const { $createContentApi } = useNuxtApp()
const fsxaApi = $createContentApi()
const loading = ref(true)
const { activeNavigationItem, setNavigationData } = useNavigationData()
const { currentDataset } = useContent()

const allLocales = availableLocales.value

onMounted(() => {
  loading.value = false
})

const emits = defineEmits(['languageSwitch'])

async function changeLanguage(locale: string) {
  if (locale === activeLocale.value) return

  // fetch navigation data for new locale
  const navigationDataAfterLocaleChange = await fetchTopLevelNavigation(
    fsxaApi,
    locale
  )

  // find corresponding navigation item in new navigation data
  const activeNavigationItemId = activeNavigationItem.value!.id
  const navigationItemAfterLocaleChange =
    navigationDataAfterLocaleChange?.idMap[activeNavigationItemId]

  if (!navigationItemAfterLocaleChange)
    throw createError('Navigation item not found')

  const isProjection = !!navigationItemAfterLocaleChange.seoRouteRegex

  let translatedRoute: string | undefined =
    navigationItemAfterLocaleChange.seoRoute

  // if content projection ==> determine route from dataset
  if (isProjection) {
    const currentDatasetId = currentDataset.value!.id
    const pageId = navigationItemAfterLocaleChange.caasDocumentId
    const dataset = await fetchDatasetById(fsxaApi, currentDatasetId, locale)
    if (!dataset) throw createError('No dataset')
    translatedRoute = dataset.routes.find(
      (route) => route.pageRef === pageId
    )?.route
  }
  if (!translatedRoute)
    throw createError('Translated route could not be determined')

  setNavigationData(navigationDataAfterLocaleChange)
  useRouter().push(translatedRoute)

  emits('languageSwitch', locale)
}
</script>
