<template>
  <div class="border-b py-2">
    <div class="container mx-auto flex items-center">
      <img src="/logo.png" /><span>NAVBAR</span>
      <ul
        v-for="navItem of topNavigation"
        :key="navItem?.id"
        class="group relative"
      >
        <InternalLink :nav-item="navItem" />

        <div
          v-if="getSubNavigation(navItem).length > 0"
          class="absolute top-10 left-0 hidden border bg-white p-2 group-hover:block"
        >
          <ul
            v-for="subNavItem of getSubNavigation(navItem)"
            :key="subNavItem?.id"
          >
            <InternalLink :nav-item="subNavItem" />
          </ul>
        </div>
      </ul>
      <ul v-for="locale of config.allLocales" :key="locale">
        <button
          class="p-3"
          :class="
            locale === config.activeLocale ? 'bg-green-300' : 'bg-gray-50'
          "
          @click="setLocale(locale)"
        >
          <span class="text-lg font-bold">{{ locale }}</span>
        </button>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavigationItem } from "fsxa-api";

const { config, setLocale } = useLocale();
const { navigationData } = useNavigationData();

// TODO: Make beautiful
const topNavigation = computed(() => {
  return (navigationData.value?.structure ?? [])
    .map((item) => navigationData.value?.idMap[item.id])
    .filter((e) => e !== undefined) as NavigationItem[];
});
// TODO: Make beautiful
function getSubNavigation(navItem: NavigationItem) {
  return (navigationData.value?.structure ?? [])
    .find((item) => item.id === navItem.id)
    ?.children?.map((item) => navigationData?.value?.idMap[item.id])
    .filter((e) => e !== undefined) as NavigationItem[];
}
</script>
