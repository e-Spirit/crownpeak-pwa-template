<template>
  <img :srcset="srcSet" :sizes="sizes" :alt="alt" />
</template>

<script lang="ts" setup>
import { Image } from 'fsxa-api'
const props = defineProps<{ image: Image; alt?: string }>()

const srcSet = computed(() => {
  return Object.values(props.image.resolutions)
    .map((resolution) => `${resolution.url} ${resolution.width}w`)
    .join(', ')
})

const sizes = computed(() => {
  return Object.values(props.image.resolutions)
    .map(
      (resolution) => `(max-width: ${resolution.width}px) ${resolution.width}w`
    )
    .join(', ')
})
</script>
