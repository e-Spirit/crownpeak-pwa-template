<template>
  <div :data-testid="'pageBody-' + pageBody.name">
    <div
      v-for="(pageBodyContent, index) in pageBody.children"
      :key="pageBodyContent.type + index"
      data-testid="pageBodyChild"
      class="group relative"
    >
      <Dev
        v-if="showDev && $isPreviewMode"
        :content="pageBodyContent"
        class="hidden group-hover:block"
        component-name="section"
      />

      <component
        :is="getComponentFromPageBodyContent(pageBodyContent)"
        :content="pageBodyContent"
      />
    </div>
    <ClientOnly>
      <AddSection v-if="$isPreviewMode" :body-name="pageBody.name" />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { PageBody, PageBodyContent } from 'fsxa-api'

defineProps<{ pageBody: PageBody }>()

const { showDev } = useDev()

const { $isPreviewMode } = useNuxtApp()

function getComponentFromPageBodyContent(pageBodyContent: PageBodyContent) {
  switch (pageBodyContent.type) {
    case 'Dataset':
      return resolveComponent('PageBodyContentDataset')
    case 'Content2Section':
      return resolveComponent('PageBodyContentSection')
    case 'Section':
      return resolveComponent('PageBodyContentSection')
    default:
      return resolveComponent('Unknown')
  }
}
</script>
