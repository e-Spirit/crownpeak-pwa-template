<template>
  <span>
    <ElementsRichTextElement
      v-for="(richTextElement, index) in richtext"
      :key="'rte' + index"
      :rich-text-element="richTextElement"
    />
  </span>
</template>

<script lang="ts" setup>
import { RichTextElement } from "fsxa-api";
defineProps<{ richtext: RichTextElement[] }>();
</script>
