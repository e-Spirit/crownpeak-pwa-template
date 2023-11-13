<template>
  <h2>{{ props.data.st_headline }}</h2>
  <h3>{{ props.data.st_subheadline }}</h3>
  <ElementsImage :image="props.data.st_image" />
  <ElementsInternalLink v-if="data.st_cta" :link-data="data.st_cta">
    <p>{{ data.st_cta.data.lt_text }}</p>
    <!-- TODO: add arrow icon here -->
  </ElementsInternalLink>
</template>
<script setup lang="ts">
import { Image } from 'fsxa-api'
import { InternalLink } from 'types'

interface StageData {
  st_headline: string
  st_subheadline: string
  st_image: Image
  st_image_alt_text?: string
  st_cta?: InternalLink
}

const props = defineProps<{ data: StageData }>()
</script>
