<template>
  <div>
    <h2>{{ props.data.st_headline }}</h2>
  </div>
</template>

<script setup lang="ts">
interface LatestNews {
  st_headline: string
  st_newsTag: {
    type: string
    key: string
    value: string
  }
}
const props = defineProps<{ data: LatestNews }>()
// TODO: resolve the news item in the data and render it
</script>

<style scoped></style>
