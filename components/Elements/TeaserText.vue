<template>
  <h2
    v-if="headline"
    class="tracking-px-n mb-8 font-heading text-3xl font-bold leading-none text-primary md:text-4xl"
    data-preview-id="#st_headline"
  >
    {{ headline }}
  </h2>
  <p v-if="text" class="mb-5 text-gray-600" data-preview-id="#st_text">
    <ElementsRichText :richtext="text" />
  </p>
</template>

<script setup lang="ts">
import { RichTextElement } from 'fsxa-api'
defineProps<{ headline?: string; text?: RichTextElement[] }>()
</script>

<style scoped></style>
