<template>
  <component
    :is="richtTextElementComponent"
    class=""
    :rich-text-element="richTextElement"
    :richtext="richTextElement.content"
  />
</template>

<script lang="ts" setup>
import { RichTextElement } from "fsxa-api";
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
    case "linebreak":
      return resolveComponent("ElementsLinebreak");
    default:
      return resolveComponent("ElementsUnknownRichtextElement");
  }
});
</script>
