<template>
  <div
    class="fixed inset-0 top-0 left-0 -z-10 w-full border bg-white pt-16"
    data-testid="mobileNavigation"
  >
    <div class="container mx-auto h-screen w-full bg-white p-2">
      <div class="h-full overflow-scroll">
        <ul class="flex flex-col items-center divide-y border-t">
          <li
            v-for="navItem of topNavigation"
            :key="navItem?.id"
            class="w-full"
          >
            <div class="flex items-center justify-between py-3 px-2 font-bold">
              <InternalLink :nav-item="navItem" @click="$emit('close')" />
              <button
                v-if="
                  getSubNavigation(navItem).length > 0 &&
                  extended !== navItem.id
                "
                @click="extended = navItem.id"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button v-if="extended === navItem.id" @click="extended = null">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <ul v-if="extended === navItem.id" class="divide-y bg-white">
              <li
                v-for="subNavItem of getSubNavigation(navItem)"
                :key="subNavItem?.id"
                class="w-full py-3 px-2"
              >
                <InternalLink :nav-item="subNavItem" @click="$emit('close')" />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NavigationItem } from "fsxa-api";

const { navigationData } = useNavigationData();
const extended = ref();

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
