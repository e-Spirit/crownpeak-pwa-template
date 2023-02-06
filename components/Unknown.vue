<template>
  <DevOnly>
    <div
      class="relative border bg-red-50 p-4 font-bold text-red-500"
      data-testid="unknown"
    >
      <Dev v-if="content" :content="content" />
      Unkown Component: {{ componentType }}
    </div>
  </DevOnly>
</template>
<script lang="ts" setup>
import { Section, Dataset, Content2Section, Page } from "fsxa-api";
const props = defineProps<{
  content?: Section | Dataset | Content2Section | Page;
}>();

const componentType = computed(() => {
  switch (props.content?.type) {
    case "Section":
      return "Section " + props.content.sectionType;
    case "Content2Section":
      return "Content2Section " + props.content.sectionType;
    case "Dataset":
      return "Dataset " + props.content.schema + " " + props.content.template;
    default:
      return props.content;
  }
});
</script>
