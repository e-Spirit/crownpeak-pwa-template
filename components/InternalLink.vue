<template>
  <NuxtLink
    :to="`${navItem.seoRoute}` || '/'"
    class="hover:underline"
    @click="setActiveNavigationItem"
  >
    {{ navItem.label || "??" }}
  </NuxtLink>
</template>

<script setup lang="ts">
import { NavigationItem } from "fsxa-api";

const { setActiveNavigationItem } = useNavigationData();

defineProps<{
  navItem: NavigationItem;
}>();
</script>
