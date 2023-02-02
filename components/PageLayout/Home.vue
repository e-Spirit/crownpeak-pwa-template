<template>
  <div :data-preview-id="page.previewId">
    <NuxtLayout name="default">
      <template #header>
        <SectionSlider :data="page.data['pt_slider']" />
      </template>
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
