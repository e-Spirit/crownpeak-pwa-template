<template>
  <div class="flex flex-col space-y-3 p-4 md:p-0">
    <h2
      v-if="headline"
      class="text-4xl font-black uppercase"
      data-preview-id="#st_headline"
    >
      {{ headline }}
    </h2>
    <p v-if="text" class="text-gray-600" data-preview-id="#st_text">
      <ElementsRichText :richtext="text" />
    </p>
  </div>
</template>

<script setup lang="ts">
import { RichTextElement } from 'fsxa-api'
defineProps<{ headline?: string; text?: RichTextElement[] }>()
</script>

<style scoped></style>
