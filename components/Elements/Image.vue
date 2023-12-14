<template>
  <img :srcset="srcSet" :sizes="sizes" :alt="alt" />
</template>

<script lang="ts" setup>
import { Image } from 'fsxa-api'
const props = defineProps<{ image: Image; alt?: string; ratio?: string }>()

const srcSet = computed(() => {
  return Object.entries(props.image.resolutions)
    .filter((resolution) => {
      const resolutionName = resolution[0]
      const aspectRatio = props.ratio
      return aspectRatio ? resolutionName.includes(aspectRatio) : true
    })
    .map((resolution) => {
      const resolutionEntry = resolution[1]
      return `${resolutionEntry.url} ${resolutionEntry.width}w`
    })
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
