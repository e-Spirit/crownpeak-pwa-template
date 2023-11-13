<template>
  <div class="mb-16 w-full px-4 md:w-1/2 lg:w-1/3">
    <div>{{ index }}</div>
    <h4>{{ data.st_title }}</h4>
    <ElementsRichText :richtext="data.st_text" />
  </div>
</template>

<script setup lang="ts">
import { StepsItem } from 'types'
defineProps<{ data: StepsItem; index: number }>()
</script>

<style scoped></style>
