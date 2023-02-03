<template>
  <div :data-preview-id="page.previewId" data-testid="standardPageLayout">
    <NuxtLayout name="default">
      <template #header> <SectionHeader /></template>
      <PageBody
        v-for="pageBody in page.children"
        :key="pageBody.previewId"
        :page-body="pageBody"
      />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Page } from "fsxa-api/dist/types";
defineProps<{ page: Page }>();
</script>
