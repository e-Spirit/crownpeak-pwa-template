<template>
  <component :is="pageLayoutComponent" :page="page" />
</template>

<script setup lang="ts">
import { Page } from "fsxa-api/dist/types";

const {
  params: { slug },
} = useRoute();
const { $fsxaApi } = useNuxtApp();
const id = Array.isArray(slug) ? slug.join("/") : slug;
const page = await $fsxaApi.fetchElement<Page>({
  locale: "de_DE",
  id: id === "" ? "c8a158a3-2ba3-427c-a7e4-7d41d9844464" : id,
});

const pageLayoutComponent = computed(() => {
  switch (page.layout) {
    case "homepage":
      return resolveComponent("PageLayoutHome");
    case "standard":
      return resolveComponent("PageLayoutStandard");
    default:
      return resolveComponent("Unknown");
  }
});

definePageMeta({
  layout: false,
});

// meta tags
useHead({
  title: page.data["pt_title"],
});
</script>
