<template>
  <div data-testid="homePageLayout">
    <PageBody
      v-for="pageBody in page.children.slice().reverse()"
      :key="pageBody.previewId"
      :page-body="pageBody"
    />
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
