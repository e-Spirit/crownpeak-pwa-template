<template>
  <div data-testid="section">
    <DevOnly>
      <Unknown v-if="!sectionComponent && showDev" :content="content" />
    </DevOnly>
    <component
      :is="sectionComponent"
      v-if="sectionComponent"
      :data="content.data"
      :data-preview-id="
        content.previewId.split('.')[0] !== '' ? content.previewId : undefined
      "
    />
  </div>
</template>

<script setup lang="ts">
import { Section } from "fsxa-api";
const props = defineProps<{ content: Section }>();

const { showDev } = useDev();

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
