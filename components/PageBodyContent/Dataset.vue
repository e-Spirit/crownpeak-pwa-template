<template>
  <div data-testid="dataset">
    <component
      :is="sectionComponent"
      :data-preview-id="content.previewId"
      :content="content"
    />
  </div>
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
