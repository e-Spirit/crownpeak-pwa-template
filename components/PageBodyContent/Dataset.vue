<template>
  <div data-testid="dataset">
    <DevOnly v-if="!datasetComponent">
      <Unknown :content="content" />
    </DevOnly>
    <component :is="datasetComponent" :content="content" />
  </div>
</template>

<script setup lang="ts">
import { Dataset } from "fsxa-api";
const props = defineProps<{ content: Dataset }>();

const datasetComponent = computed(() => {
  switch (props.content.template) {
    // TODO
    default:
      return undefined;
  }
});
</script>
