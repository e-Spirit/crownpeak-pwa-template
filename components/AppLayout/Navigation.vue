<template>
  <div class="flex border-b py-2">
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
  </div>
</template>

<script setup lang="ts">
import { NavigationItem } from "fsxa-api";

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
