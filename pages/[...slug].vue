<template>
  <div>
    <component
      :is="pageLayoutComponent"
      v-if="currentPage"
      :page="currentPage"
    />
    <DevOnly>
      <div class="fixed top-0 right-0 z-30">
        <Dev v-if="currentPage" :content="currentPage" />
      </div>
    </DevOnly>
  </div>
</template>

<script setup lang="ts">
const { currentPage } = useContent();

const pageLayoutComponent = computed(() => {
  switch (currentPage.value?.layout) {
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
  title: currentPage.value?.data["pt_title"],
});
</script>
