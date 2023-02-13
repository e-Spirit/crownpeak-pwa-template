<template>
  <span
    class="group relative border bg-red-50 p-2 text-red-500"
    data-testid="unknown"
  >
    <Dev :content="richTextElement" class="hidden group-hover:block" />
    <span class="font-bold">Unkown Richtext Element </span>
  </span>
</template>
<script lang="ts" setup>
import { RichTextElement } from "fsxa-api/dist/types";

defineProps<{
  richTextElement?: RichTextElement;
}>();
</script>
