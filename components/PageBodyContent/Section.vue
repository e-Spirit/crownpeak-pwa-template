<template>
  <div data-testid="section">
    <component
      :is="sectionComponent"
      v-if="sectionComponent"
      :data="content.data"
      :data-preview-id="
        content.previewId?.split('.')[0] !== '' ? content.previewId : undefined
      "
    />
    <Unknown
      v-if="!sectionComponent && $isPreviewMode"
      :content="content"
      :data="content.data"
    />
  </div>
</template>

<script setup lang="ts">
import { Section } from 'fsxa-api'
const props = defineProps<{ content: Section }>()

const { $isPreviewMode } = useNuxtApp()

const sectionComponent = computed(() => {
  switch (props.content.sectionType) {
    case 'interesting_facts':
      return resolveComponent('SectionInterestingFacts')
    case 'products.category_products':
      return resolveComponent('SectionProductCategory')
    case 'products.product':
      return resolveComponent('SectionProduct')
    case 'teaser':
      return resolveComponent('SectionTeaser')
    case 'languageimage':
      return resolveComponent('SectionLanguageImage')
    default:
      return undefined
  }
})
</script>
