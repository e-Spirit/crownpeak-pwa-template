<template>
  <div>
    <NuxtLink :to="productRoute">
      <ElementsImage :image="data.tt_image" :alt="data.tt_image_alt_text" />
      <h2>{{ data.tt_name }}</h2>
      <p>{{ data.tt_teaserText }}</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ProductData } from 'types'

defineProps<{ data: ProductData; productRoute: string }>()
</script>

<style scoped></style>
