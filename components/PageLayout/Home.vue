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
const props = defineProps<{ page: Page }>()
const top = props.page.children.find((pagebody) => pagebody.name === 'top')!
const content = props.page.children.find(
  (pagebody) => pagebody.name === 'content'
)!
</script>
