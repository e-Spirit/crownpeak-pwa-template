<template>
  <div class="border-b py-2">
    <div class="flex items-center container mx-auto">
      <img src="/logo.png" /><span>NAVBAR</span>
      <ul v-for="navItem of topNavigation" :key="navItem?.id">
        <InternalLink :nav-item="navItem" />
      </ul>
      <ul v-for="locale of config.allLocales" :key="locale">
        <button
          class="p-3"
          :class="
            locale === config.activeLocale ? 'bg-green-300' : 'bg-gray-50'
          "
          @click="setLocale(locale)"
        >
          <span class="font-bold text-lg">{{ locale }}</span>
        </button>
      </ul>
    </div>
    <div class="flex flex-row container mx-auto items-center">
      <ul v-for="navItem of subNavigation" :key="navItem?.id">
        <InternalLink :nav-item="navItem" />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavigationItem } from "fsxa-api";

const { config, setLocale } = useLocale();
const { navigationData, navigationItem } = useNavigationData();

// TODO: Make beautiful
const topNavigation = computed(() => {
  return (navigationData?.value?.structure ?? [])
    .map((item) => navigationData?.value?.idMap[item.id])
    .filter((e) => e !== undefined) as NavigationItem[];
});
// TODO: Make beautiful
const subNavigation = computed(() => {
  return (navigationData?.value?.structure ?? [])
    .find((item) => item.id === navigationItem?.value?.id)
    ?.children?.map((item) => navigationData?.value?.idMap[item.id])
    .filter((e) => e !== undefined) as NavigationItem[];
});
</script>
