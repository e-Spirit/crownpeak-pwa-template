<template>
  <div
    class="grid items-center gap-8 py-10 md:grid-cols-2"
    data-testid="teaserSection"
  >
    <ElementsTeaserText
      v-if="data.st_layout.key === 'text-image'"
      :headline="data.st_headline"
      :text="data.st_text"
    />
    <ElementsTeaserImage
      v-if="data.st_layout.key === 'text-image'"
      :image="data.st_image"
      :alt-text="data.st_image_alt_text"
    />
    <ElementsTeaserImage
      v-if="data.st_layout.key === 'image-text'"
      :image="data.st_image"
      :alt-text="data.st_image_alt_text"
    />
    <ElementsTeaserText
      v-if="data.st_layout.key === 'image-text'"
      :headline="data.st_headline"
      :text="data.st_text"
    />
    <ElementsInternalLink v-if="data.st_cta" :link-data="data.st_cta">
      <button class="btn btn-primary">
        {{ data.st_cta.data.lt_text }}
      </button>
    </ElementsInternalLink>
  </div>
</template>
<script setup lang="ts">
import { Image, RichTextElement } from 'fsxa-api'
import { InternalLink, OptionType } from 'types'

interface Teaser {
  st_headline: string
  st_image?: Image
  st_image_alt_text?: string
  st_text: RichTextElement[]
  st_design: OptionType
  st_layout: OptionType
  st_cta?: InternalLink
}

defineProps<{ data: Teaser }>()
</script>
