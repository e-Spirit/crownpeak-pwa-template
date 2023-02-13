<template>
  <span class="bg-green-700 bg-opacity-30">
    <NuxtLink class="underline" to="/">
      <ElementsRichText />

      {{ richTextElement.data.data["lt_text"] }}</NuxtLink
    >
  </span>
</template>

<script setup lang="ts">
import { RichTextElement, Link } from "fsxa-api";

interface RichTextLink {
  type: "link";
  content: RichTextElement[];
  data: Link;
}

const props = defineProps<{ richTextElement: RichTextLink }>();

console.log("link ");
console.log(props.richTextElement);
</script>
