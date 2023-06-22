<template>
  <div data-testid="navigation ">
    <ul class="flex items-center space-x-4 py-6 text-gray-800">
      <li
        v-for="navItem of topNavigation"
        :key="navItem?.id"
        class="group relative"
      >
        <InternalLink :nav-item="navItem" />
        <ul
          v-if="getSubNavigation(navItem).length > 0"
          class="absolute top-6 right-0 hidden divide-y bg-white shadow-lg group-hover:block"
        >
          <li
            v-for="subNavItem of getSubNavigation(navItem)"
            :key="subNavItem?.id"
            class="w-full py-3 px-4"
          >
            <InternalLink :nav-item="subNavItem" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { NavigationItem } from 'fsxa-api'

const { navigationData } = useNavigationData()

const topNavigation = computed(() => {
  return (navigationData.value?.structure ?? [])
    .map((item) => navigationData.value?.idMap[item.id])
    .filter((e) => e !== undefined) as NavigationItem[]
})

function getSubNavigation(navItem: NavigationItem) {
  return (navigationData.value?.structure ?? [])
    .find((item) => item.id === navItem.id)
    ?.children?.map((item) => navigationData?.value?.idMap[item.id])
    .filter((e) => e !== undefined) as NavigationItem[]
}
</script>
