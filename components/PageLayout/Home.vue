<template>
  <div :data-preview-id="page.previewId" data-testid="homePageLayout">
    <NuxtLayout name="default">
      <template #header>
        <SectionSlider v-if="page.data" :data="page.data['pt_slider']" />
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
import { Page } from "fsxa-api";
defineProps<{ page: Page }>();
</script>
