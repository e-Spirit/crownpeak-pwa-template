<template>
  <component
    :is="sectionComponent"
    :data-preview-id="content.previewId"
    data-testid="section"
    :data="content.data"
  />
</template>

<script setup lang="ts">
import { Section } from "fsxa-api";
const props = defineProps<{ content: Section }>();

const sectionComponent = computed(() => {
  switch (props.content.sectionType) {
    case "interesting_facts":
      return resolveComponent("SectionInterestingFacts");
    case "teaser":
      return resolveComponent("SectionTeaser");
    case "slider":
      return resolveComponent("SectionSlider");
    case "products.category_products":
      return resolveComponent("SectionProductCategory");
    case "products.product":
      return resolveComponent("SectionProduct");
    default:
      return resolveComponent("Unknown");
  }
});
</script>
