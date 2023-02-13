<template>
  <div
    class="group relative border bg-red-50 p-4 text-red-500"
    data-testid="unknown"
  >
    <Dev :content="content" class="hidden group-hover:block" />
    <span class="font-bold">Unkown Component {{ componentType }}</span>
  </div>
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
