<template>
  <div data-testid="homePageLayout">
    <SectionSlider
      v-if="page.data && page.data['pt_slider']"
      :data="page.data['pt_slider']"
    />
    <PageBody
      v-for="pageBody in page.children"
      :key="pageBody.previewId"
      :page-body="pageBody"
    />
  </div>
</template>

<script setup lang="ts">
import { Page } from 'fsxa-api'
defineProps<{ page: Page }>()
</script>
