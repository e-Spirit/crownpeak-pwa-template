<template>
  <div>
    <span>{{ data.st_category.value }}</span>
    <h2>{{ data.st_headline }}</h2>
    <ElementsRichText :richtext="data.st_text" />
    <ElementsInternalLink :link-data="data.st_category_link">
      <button class="bg-red-500">
        {{ props.data.st_category_link.data.lt_text }}
      </button>
    </ElementsInternalLink>
    <SectionCategoryProductsList :category-id="data.st_category.key" />
  </div>
</template>

<script setup lang="ts">
import { RichTextElement } from 'fsxa-api'
import { InternalLink, OptionType } from 'types'

interface ProductCategoryTeaser {
  st_category: {
    type: string
    key: string
    value: string
  }
  st_category_link: InternalLink
  st_headline: string
  st_text: RichTextElement[]
  st_text_alignment: OptionType
}

const props = defineProps<{ data: ProductCategoryTeaser }>()
</script>

<style scoped></style>
