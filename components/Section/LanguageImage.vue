<template>
  <div>
    <ElementsImage
      v-if="data?.st_picture"
      :data-preview-id="data.st_picture?.previewId"
      :image="data.st_picture"
    />
  </div>
</template>

<script setup lang="ts">
import { Image } from 'fsxa-api'
interface LanguageImage {
  st_picture: Image
}

defineProps<{ data: LanguageImage }>()
</script>
