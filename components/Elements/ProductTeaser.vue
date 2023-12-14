<template>
  <div class="mb-8 rounded bg-white p-6 shadow">
    <NuxtLink :to="productRoute" class="mb-6 block overflow-hidden rounded-md">
      <ElementsImage
        :image="data.tt_image"
        :alt="data.tt_image_alt_text"
        ratio="4x3"
      />
    </NuxtLink>
    <NuxtLink :to="productRoute" class="hover:underline">
      <h2 class="mb-2 font-heading text-2xl font-bold">{{ data.tt_name }}</h2>
    </NuxtLink>
    <p class="leading-loose text-text">{{ data.tt_teaserText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ProductData } from 'types'

defineProps<{ data: ProductData; productRoute: string }>()
</script>

<style scoped></style>
