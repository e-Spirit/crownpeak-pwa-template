<template>
  <div data-testid="logo">
    <img
      v-if="logoSrc"
      :src="logoSrc"
      width="96"
      height="326"
      class="mr-4 h-10 w-auto"
    />
  </div>
</template>

<script lang="ts" setup>
import { Image } from 'fsxa-api'

const { projectProperties } = useProjectProperties()

const logoSrc = computed(() => {
  if (!projectProperties.value?.data) return
  const image = projectProperties.value?.data['ps_logo'] as Image
  if (!image) return
  return image.resolutions['ORIGINAL']?.url
})
</script>
