<template>
  <span>
    <NuxtLink class="underline" to="/">{{
      richTextElement.data.data["lt_text"]
    }}</NuxtLink>
  </span>
</template>

<script setup lang="ts">
import { RichTextElement, Link } from "fsxa-api";

interface RichTextLink {
  type: "link";
  content: RichTextElement[];
  data: Link;
}

defineProps<{ richTextElement: RichTextLink }>();
</script>
