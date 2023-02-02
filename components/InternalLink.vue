<template>
  <NuxtLink
    :to="`${props.navItem.seoRoute}`"
    class="flex flex-col hover:bg-blue-400 p-3"
    @click="setActiveNavigationItem(props.navItem)"
  >
    <span class="font-bold text-lg">{{ props.navItem.label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { NavigationItem } from "fsxa-api";

const { setActiveNavigationItem } = useNavigationData();

const props = defineProps<{
  navItem: NavigationItem;
}>();
</script>
