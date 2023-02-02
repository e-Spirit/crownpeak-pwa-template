<template>
  <component
    :is="sectionComponent"
    :data-preview-id="content.previewId"
    data-testid="dataset"
    :content="content"
  />
</template>

<script setup lang="ts">
import { Dataset } from "fsxa-api/dist/types";
const props = defineProps<{ content: Dataset }>();

const sectionComponent = computed(() => {
  switch (props.content.template) {
    // TODO
    default:
      return resolveComponent("Unknown");
  }
});
</script>
