<template>
  <div v-if="image" class="relative mx-auto max-w-max md:mr-0">
    <div class="relative overflow-hidden rounded-7xl">
      <ElementsImage
        v-if="image"
        :data-preview-id="image.previewId"
        :image="image"
        :alt="altText"
        ratio="4x3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image } from 'fsxa-api'
defineProps<{ image?: Image; altText?: string }>()
</script>

<style scoped></style>
