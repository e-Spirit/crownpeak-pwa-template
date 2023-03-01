<template>
  <div class="group relative flex items-center" data-testid="languageSwitch">
    <div class="rounded-full p-2 text-gray-800 hover:bg-gray-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="my-auto h-6 w-6"
      >
        <path
          fill-rule="evenodd"
          d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.038 48.038 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <div
      data-testid="languagesDropdown"
      class="absolute top-10 right-0 hidden divide-y bg-white shadow-lg group-hover:block"
    >
      <ul>
        <li v-for="locale of config.allLocales" :key="locale.identifier">
          <button
            :disabled="loading"
            :data-testid="`${locale.identifier}-switch`"
            :data-activeLocale="locale.identifier === activeLocale"
            :class="{
              underline: locale.identifier === activeLocale,
            }"
            class="w-full py-3 px-4 hover:bg-gray-200"
            @click="changeLanguage(locale.identifier)"
          >
            {{ locale.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { config, activeLocale } = useLocale();
const { $fsxaApi } = useNuxtApp();
const loading = ref(true);
const { activeNavigationItem, setNavigationData } = useNavigationData();
const { currentDataset } = useContent();

onMounted(() => {
  loading.value = false;
});

const emits = defineEmits(["languageSwitch"]);

async function changeLanguage(locale: string) {
  if (locale === activeLocale.value) return;

  // fetch navigation data for new locale
  const navigationDataAfterLocaleChange = await fetchTopLevelNavigation(
    $fsxaApi,
    locale
  );

  // find corresponding navigation item in new navigation data
  const activeNavigationItemId = activeNavigationItem.value!.id;
  const navigationItemAfterLocaleChange =
    navigationDataAfterLocaleChange?.idMap[activeNavigationItemId];

  if (!navigationItemAfterLocaleChange)
    throw createError("Navigation item not found");

  const isProjection = !!navigationItemAfterLocaleChange.seoRouteRegex;

  let translatedRoute: string | undefined =
    navigationItemAfterLocaleChange.seoRoute;

  // if content projection ==> determine route from dataset
  if (isProjection) {
    const currentDatasetId = currentDataset.value!.id;
    const pageId = navigationItemAfterLocaleChange.caasDocumentId;
    const dataset = await fetchDatasetById($fsxaApi, currentDatasetId, locale);
    if (!dataset) throw createError("No dataset");
    translatedRoute = dataset.routes.find(
      (route) => route.pageRef === pageId
    )?.route;
  }
  if (!translatedRoute)
    throw createError("Translated route could not be determined");

  setNavigationData(navigationDataAfterLocaleChange);
  useRouter().push(translatedRoute);

  emits("languageSwitch", locale);
}
</script>
