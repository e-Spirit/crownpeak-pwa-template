<template>
  <div :data-preview-id="pageBody.previewId" data-testid="pageBody">
    <div
      v-for="(pageBodyContent, index) in pageBody.children"
      :key="pageBodyContent.type + index"
      class="group my-4"
      data-testid="pageBodyChild"
    >
      <Dev
        v-if="devMode"
        class="hidden group-hover:block"
        :content="pageBodyContent"
      />
      <component
        :is="getComponentFromPageBodyContent(pageBodyContent)"
        :content="pageBodyContent"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { PageBody, PageBodyContent } from "fsxa-api";

defineProps<{ pageBody: PageBody }>();

const { devMode } = useAppConfig();

function getComponentFromPageBodyContent(pageBodyContent: PageBodyContent) {
  switch (pageBodyContent.type) {
    case "Dataset":
      return resolveComponent("PageBodyContentDataset");
    case "Content2Section":
      return resolveComponent("PageBodyContentSection");
    case "Section":
      return resolveComponent("PageBodyContentSection");
    default:
      return resolveComponent("Unknown");
  }
}
</script>
