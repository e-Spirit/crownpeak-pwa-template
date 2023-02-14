<template>
  <NuxtLink
    :to="`${props.navItem.seoRoute}`"
    class="hover:underline"
    @click="setActiveNavigationItem(props.navItem)"
  >
    {{ props.navItem.label }}
  </NuxtLink>
</template>

<script setup lang="ts">
import { NavigationItem } from "fsxa-api";

const { setActiveNavigationItem } = useNavigationData();

const props = defineProps<{
  navItem: NavigationItem;
}>();
</script>
