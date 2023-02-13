<template>
  <span :class="richTextElementClasses">
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

const richTextElementClasses = computed(() => {
  const fsStyle = (props.richTextElement.data as Record<string, unknown>)[
    "data-fs-style"
  ];
  console.log(fsStyle);

  switch (fsStyle) {
    case "format.span_yellow_text":
      return "text-yellow-500";
    case "format.standard":
      return "";
    default:
      return "";
  }
});
</script>
