<template>
  <div data-testid="dataset">
    <component
      :is="datasetComponent"
      v-if="datasetComponent"
      :content="content"
    />
    <Unknown
      v-if="!datasetComponent && $isPreviewMode"
      :content="content"
      :data="content.data"
    />
  </div>
</template>

<script setup lang="ts">
import { Dataset } from "fsxa-api";
const props = defineProps<{ content: Dataset }>();

const datasetComponent = computed(() => {
  switch (props.content.template) {
    default:
      return undefined;
  }
});
</script>
