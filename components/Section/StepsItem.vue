<template>
  <div class="mb-16 w-full px-4 md:w-1/2 lg:w-1/3">
    <div
      class="relative h-full rounded-md bg-coolGray-50 px-8 pb-8 pt-14 shadow-md"
    >
      <div
        class="absolute left-1/2 top-0 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white"
      >
        <div
          class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-semibold text-white"
        >
          {{ index + 1 }}
        </div>
      </div>
      <h3 class="mb-4 text-xl font-semibold text-primary md:text-2xl">
        {{ data.st_title }}
      </h3>
      <p class="mb-5 font-medium text-coolGray-500">
        <ElementsRichText :richtext="data.st_text" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StepsItem } from 'types'
defineProps<{ data: StepsItem; index: number }>()
</script>

<style scoped></style>
