<template>
  <div class="w-full p-8 md:w-1/3">
    <ElementsInternalLink :link-data="props.data.st_link">
      <h3>{{ props.data.st_title }}</h3>
      <ElementsImage
        :image="props.data.st_image"
        :alt-text="props.data.st_image_alt_text"
      />
      <ElementsRichText :richtext="props.data.st_text" />
      <p>{{ linkText }}</p>
    </ElementsInternalLink>
  </div>
</template>

<script setup lang="ts">
import { Feature } from 'types'
const props = defineProps<{ data: Feature }>()
const linkText = computed(() => props.data.st_link.data.lt_text)
</script>

<style scoped></style>
