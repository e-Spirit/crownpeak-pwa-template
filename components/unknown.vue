<template>
  <div class="bg-red-50 border text-red-500 font-bold p-4">
    Unkown Component: {{ componentType }}
  </div>
</template>
<script lang="ts" setup>
import { Section, Dataset, Content2Section } from "fsxa-api/dist/types";
const props = defineProps<{ content: Section | Dataset | Content2Section }>();

const componentType = computed(() => {
  switch (props.content.type) {
    case "Section":
      return "Section " + props.content.sectionType;
    case "Content2Section":
      return "Content2Section " + props.content.sectionType;
    case "Dataset":
      return "Dataset " + props.content.schema + " " + props.content.template;
    default:
      return "???";
  }
});
</script>
