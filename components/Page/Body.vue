<template>
  <div>
    <div
      v-for="(pageBodyContent, index) in pageBody.children"
      :key="pageBodyContent.type + index"
      class="my-4"
    >
      <component
        :is="getComponentFromPageBodyContent(pageBodyContent)"
        :content="pageBodyContent"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { PageBody, PageBodyContent } from "fsxa-api/dist/types";
defineProps<{ pageBody: PageBody }>();

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
