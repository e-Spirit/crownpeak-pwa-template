<template>
  <span class="border bg-red-800 bg-opacity-20">
    <component
      :is="richtTextElementComponent"
      v-if="Array.isArray(richTextElement.content)"
      class=""
      :rich-text-element="richTextElement"
      :richtext="richTextElement.content"
    />
    <span v-else>{{ richTextElement.content }}</span>
    <!--  -->
  </span>
</template>

<script lang="ts" setup>
import { RichTextElement } from "fsxa-api";
// TODO: remove all data any types
const props = defineProps<{ richTextElement: RichTextElement }>();

const richtTextElementComponent = computed(() => {
  switch (props.richTextElement.type) {
    case "text":
      return resolveComponent("ElementsRichText");
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
