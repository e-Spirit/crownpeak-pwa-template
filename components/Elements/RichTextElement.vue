<template>
  <component
    :is="richtTextElementComponent"
    class=""
    :rich-text-element="richTextElement"
    :richtext="richTextElement.content"
  />
</template>

<script lang="ts" setup>
import { RichTextElement } from "fsxa-api/dist/types";
// TODO: remove all data any types
const props = defineProps<{ richTextElement: RichTextElement }>();

const richtTextElementComponent = computed(() => {
  switch (props.richTextElement.type) {
    case "text":
      return resolveComponent("ElementsText");
    case "link":
      return resolveComponent("ElementsLink");
    case "block":
      return resolveComponent("ElementsRichText");
    default:
      return resolveComponent("unknown");
  }
});
</script>
