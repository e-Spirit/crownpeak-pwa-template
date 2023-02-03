<template>
  <div data-testid="content2section">
    <component :is="sectionComponent" :content="content" />
  </div>
</template>

<script setup lang="ts">
import { Content2Section } from "fsxa-api/dist/types";

const props = defineProps<{ content: Content2Section }>();

const sectionComponent = computed(() => {
  switch (props.content.sectionType) {
    // TODO
    default:
      return resolveComponent("Unknown");
  }
});
</script>
