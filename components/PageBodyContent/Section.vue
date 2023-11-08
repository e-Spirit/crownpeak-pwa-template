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
    case 'news_overview':
      return resolveComponent('SectionNewsOverview')
    case 'text_image':
      return resolveComponent('SectionTextImage')
    case 'google_maps':
      return resolveComponent('SectionGoogleMaps')
    case 'product_category_teaser':
      return resolveComponent('SectionProductCategoryTeaser')
    case 'table':
      return resolveComponent('SectionTable')
    case 'steps':
      return resolveComponent('SectionSteps')
    case 'latest_news':
      return resolveComponent('SectionLatestNews')
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
    case 'products.product':
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
