<template>
  <div data-testid="homePageLayout">
    <PageBody :page-body="top" />
    <PageBody :page-body="content" />
  </div>
</template>

<script setup lang="ts">
import { Page } from 'fsxa-api'
import { computed } from 'vue'

const props = defineProps<{ page: Page }>()
const top = computed(() => {
  return props.page.children.find((pagebody) => pagebody.name === 'top')!
})
const content = computed(() => {
  return props.page.children.find((pagebody) => pagebody.name === 'content')!
})
</script>
