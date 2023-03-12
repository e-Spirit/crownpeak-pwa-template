<template>
  <div data-testid="dataset">
    <component :is="datasetComponent" :content="content" />
  </div>
</template>

<script setup lang="ts">
import { Dataset } from "fsxa-api";
const props = defineProps<{ content: Dataset }>();

const datasetComponent = computed(() => {
  switch (props.content.template) {
    default:
      return resolveComponent("Unknown");
  }
});
</script>
