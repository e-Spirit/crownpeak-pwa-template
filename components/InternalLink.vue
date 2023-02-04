<template>
  <NuxtLink
    :to="`${props.navItem.seoRoute}`"
    class="flex flex-col p-3 hover:bg-blue-400"
    @click="setActiveNavigationItem(props.navItem)"
  >
    <span class="text-lg font-bold">{{ props.navItem.label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { NavigationItem } from "fsxa-api";

const { setActiveNavigationItem } = useNavigationData();

const props = defineProps<{
  navItem: NavigationItem;
}>();
</script>
