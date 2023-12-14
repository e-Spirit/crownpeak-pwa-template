<template>
  <section>
    <div class="radius-for-skewed bg-gray-100 py-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap items-center">
          <SectionCategoryProductsDescription
            :headline="data.st_headline"
            :link="data.st_category_link"
            :category="data.st_category.value"
            :richtext="data.st_text"
          />

          <SectionCategoryProductsList :category-id="data.st_category.key" />
        </div>
      </div>
    </div>
  </section>
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

defineProps<{ data: ProductCategoryTeaser }>()
</script>

<style scoped></style>
