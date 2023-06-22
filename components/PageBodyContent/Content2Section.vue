<template>
  <div data-testid="content2section">
    <component
      :is="content2SectionComponent"
      v-if="content2SectionComponent"
      :content="content"
    />

    <Unknown
      v-if="!content2SectionComponent && $isPreviewMode"
      :content="content"
      :data="content.data"
    />
  </div>
</template>

<script setup lang="ts">
import { Content2Section } from 'fsxa-api'

const props = defineProps<{ content: Content2Section }>()
const { $isPreviewMode } = useNuxtApp()

const content2SectionComponent = computed(() => {
  switch (props.content.sectionType) {
    default:
      return undefined
  }
})
</script>
