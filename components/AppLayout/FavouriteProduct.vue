<template>
  <NuxtLink :to="route">
    <div class="relative mb-2 flex rounded-xl ring-1 ring-black/5">
      <ElementsImage
        :image="image"
        class="m-2 h-14 w-14 rounded-full shadow-lg"
        ratio="4x3"
      />
      <div class="m-2">
        <div
          class="text-slate-900 dark:text-slate-200 text-sm font-medium sm:text-base"
        >
          {{ name }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Image } from 'fsxa-api'

defineProps<{ name: string; image: Image; route: string }>()
</script>

<style scoped></style>
