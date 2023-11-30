<template>
  <div data-testid="navigation">
    <ul class="relative hidden w-full items-end font-semibold lg:flex">
      <li
        v-for="navItem of topNavigation"
        :key="navItem?.id"
        class="group/navItem static"
      >
        <InternalLink
          :nav-item="navItem"
          class="block px-3 py-2 hover:opacity-50"
        />
        <div v-if="getSubNavigation(navItem).length > 0" class="subnavigation">
          <div
            class="relative top-6 z-10 w-full rounded-xl border border-gray-500 bg-white p-6 shadow-xl"
          >
            <div class="grid grid-cols-1 gap-6">
              <ul class="text-[15px]">
                <li
                  v-for="subNavItem of getSubNavigation(navItem)"
                  :key="subNavItem?.id"
                >
                  <InternalLink
                    :nav-item="subNavItem"
                    class="block py-1 font-normal text-gray-600 hover:text-gray-800"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
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
<style scoped>
.subnavigation {
  @apply invisible absolute left-0 top-6 z-50 min-w-full translate-y-0 transform;
  @apply opacity-0 transition duration-500 ease-in-out;
  @apply group-hover/navItem:visible group-hover/navItem:translate-y-5 group-hover/navItem:transform group-hover/navItem:opacity-100;
  @apply xl:w-10/12 xl:min-w-0 2xl:w-8/12;
}
</style>
