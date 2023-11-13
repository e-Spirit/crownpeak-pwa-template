<template>
  <div>
    <h2>{{ data.st_headline }}</h2>
    <ElementsRichText :richtext="data.st_subheadline" />
    <ElementsImage :image="data.st_image" :alt="data.st_image_alt_text" />
    <ElementsRichText :richtext="data.st_text" />
  </div>
</template>

<script setup lang="ts">
import { RichTextElement, Image } from 'fsxa-api'

interface TextImage {
  st_headline: string
  st_subheadline: RichTextElement[]
  st_text: RichTextElement[]
  st_image: Image
  st_image_alt_text?: string
}
defineProps<{ data: TextImage }>()
</script>

<style scoped></style>
