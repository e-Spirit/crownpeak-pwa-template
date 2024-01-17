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
defineProps<{ page: Page }>()
</script>
