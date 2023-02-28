<template>
  <div data-testid="section">
    <DevOnly v-if="!sectionComponent && $showDev()">
      <Unknown :content="content" />
    </DevOnly>
    <component
      :is="sectionComponent"
      v-else
      :data-preview-id="content.previewId"
      :data="content.data"
    />
  </div>
</template>

<script setup lang="ts">
import { Section } from "fsxa-api";
const props = defineProps<{ content: Section }>();

const sectionComponent = computed(() => {
  switch (props.content.sectionType) {
    case "interesting_facts":
      return resolveComponent("SectionInterestingFacts");
    case "products.category_products":
      return resolveComponent("SectionProductCategory");
    case "products.product":
      return resolveComponent("SectionProduct");
    case "teaser":
      return resolveComponent("SectionTeaser");
    default:
      return undefined;
  }
});
</script>
