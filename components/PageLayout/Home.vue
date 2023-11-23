<template>
  <div data-testid="homePageLayout">
    <PageBody :page-body="top" />
    <PageBody :page-body="content" />
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
