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
    case 'smartliving.product_overview':
      return resolveComponent('SectionProductOverview')
    case 'text_image':
      return resolveComponent('SectionTextImage')
    case 'product_category_teaser':
      return resolveComponent('SectionProductCategoryTeaser')
    case 'steps':
      return resolveComponent('SectionSteps')
    case 'accordion':
      return resolveComponent('SectionAccordion')
    case 'stage':
      return resolveComponent('SectionStage')
    case 'features':
      return resolveComponent('SectionFeatures')
    case 'interesting_facts':
      return resolveComponent('SectionInterestingFacts')
    case 'products.category_products':
      return resolveComponent('SectionProductCategory')
    case 'smartliving.product':
      return resolveComponent('SectionProduct')
    case 'teaser':
      return resolveComponent('SectionTeaser')
    case 'featured_products':
      return resolveComponent('SectionFeaturedProducts')
    default:
      return undefined
  }
})
</script>
