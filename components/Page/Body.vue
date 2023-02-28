<template>
  <div :data-preview-id="pageBody.previewId" data-testid="pageBody">
    <div
      v-for="(pageBodyContent, index) in pageBody.children"
      :key="pageBodyContent.type + index"
      class="group relative my-10"
      data-testid="pageBodyChild"
    >
      <DevOnly v-if="$showDev">
        <Dev
          :content="pageBodyContent"
          :dataset="currentDataset"
          class="hidden group-hover:block"
          component-name="section"
        />
      </DevOnly>

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

const { currentDataset } = useContent();

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
