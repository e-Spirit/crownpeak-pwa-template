<template>
  <div :data-preview-id="page.previewId" data-testid="standardPageLayout">
    <SectionHeader v-if="page.data" :data="page.data" />
    <PageBody
      v-for="pageBody in page.children"
      :key="pageBody.previewId"
      :page-body="pageBody"
    />
  </div>
</template>

<script setup lang="ts">
import { Page } from "fsxa-api";
defineProps<{ page: Page }>();
</script>
