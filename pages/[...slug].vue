<template>
  <div>
    <component :is="pageLayoutComponent" :page="page" />
    <DevOnly>
      <div class="fixed top-0 right-0 z-30">
        <Dev v-if="page" :content="page" />
      </div>
    </DevOnly>
  </div>
</template>

<script setup lang="ts">
const { data: page } = useContent();

const pageLayoutComponent = computed(() => {
  switch (page.value?.layout) {
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
  title: page.value?.data["pt_title"],
});
</script>
