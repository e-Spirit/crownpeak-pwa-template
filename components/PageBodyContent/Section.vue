<template>
  <component :is="sectionComponent" :content="content" />
</template>

<script setup lang="ts">
import { Section } from "fsxa-api/dist/types";
const props = defineProps<{ content: Section }>();

const sectionComponent = computed(() => {
  switch (props.content.sectionType) {
    case "interesting_facts":
      return resolveComponent("SectionInterestingFacts");
    case "teaser":
      return resolveComponent("SectionTeaser");
    case "slider":
      return resolveComponent("SectionSlider");
    default:
      return resolveComponent("Unknown");
  }
});
</script>
