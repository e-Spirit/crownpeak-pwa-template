<template>
  <ul class="list-inside list-disc">
    <li
      v-for="(item, index) in richTextElement.content"
      :key="'listitem-' + index"
    >
      <ElementsRichText :richtext="item.content" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RichTextElement } from "fsxa-api";
defineProps<{ richTextElement: { content: RichTextElement[] } }>();
</script>
