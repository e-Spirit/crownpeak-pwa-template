<template>
  <div v-if="image && typeof image !== 'string'" class="relative">
    <div
      class="h-3/4 absolute -top-10 -z-10 hidden w-1/2 border-[12px] border-gray-100 md:block"
    />

    <div class="md:pl-10">
      <ElementsImage
        v-if="image"
        :data-preview-id="image.previewId"
        :image="image"
        :alt="altText"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image } from 'fsxa-api'
defineProps<{ image?: Image; altText?: string }>()
</script>

<style scoped></style>
