<template>
  <div>
    <ElementsImage :image="data.tt_image" :alt="data.tt_image_alt_text" />
    <h2>{{ data.tt_name }}</h2>
    <p>{{ data.tt_teaserText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ProductData } from 'types'

defineProps<{ data: ProductData }>()
</script>

<style scoped></style>
