<template>
  <section class="py-14">
    <div class="container mx-auto px-4">
      <div class="-mx-4 flex flex-wrap">
        <div class="mb-14 w-full px-4">
          <h2
            class="tracking-px-n mb-8 font-heading text-3xl font-bold leading-none text-primary md:text-4xl"
          >
            {{ data.st_headline }}
          </h2>
          <p class="mb-6 text-xl font-semibold leading-7 text-coolGray-500">
            <ElementsRichText :richtext="data.st_subheadline" />
          </p>
        </div>
        <div v-if="data.st_layout.key === 'image-text'" :class="layout">
          <div v-if="data.st_image" class="w-full break-after-column px-4 pb-4">
            <ElementsImage
              :image="data.st_image"
              :alt="data.st_image_alt_text"
              ratio="16x9"
            />
          </div>
          <div class="w-full break-after-column px-4 pb-4">
            <ElementsRichText :richtext="data.st_text" />
          </div>
        </div>
        <div v-else-if="data.st_layout.key === 'text-image'" :class="layout">
          <div class="w-full break-after-column px-4 pb-4">
            <ElementsRichText :richtext="data.st_text" />
          </div>
          <div v-if="data.st_image" class="w-full break-after-column px-4 pb-4">
            <ElementsImage
              :image="data.st_image"
              :alt="data.st_image_alt_text"
              ratio="16x9"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RichTextElement, Image, Option } from 'fsxa-api'

interface TextImage {
  st_columns: Option
  st_headline: string
  st_subheadline: RichTextElement[]
  st_text: RichTextElement[]
  st_image?: Image
  st_image_alt_text?: string
  st_layout: Option
}
const props = defineProps<{ data: TextImage }>()
const layout = computed(() => {
  const twoColumns = 'lg:columns-2'
  const oneColumn = 'lg:columns-1'
  if (props.data.st_image) return twoColumns
  if (props.data.st_columns.key === '2') return twoColumns
  if (props.data.st_columns.key === '1') return oneColumn
  return ''
})
</script>

<style scoped></style>
