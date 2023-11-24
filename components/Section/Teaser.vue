<template>
  <section class="bg-white py-14">
    <div class="container mx-auto px-4" data-testid="teaserSection">
      <div
        v-if="data.st_layout.key === 'text-image'"
        class="-mx-4 flex flex-wrap items-center"
      >
        <div class="mt-8 px-4 text-left sm:w-full md:w-1/2">
          <ElementsTeaserText
            :headline="data.st_headline"
            :text="data.st_text"
          />
          <div class="flex flex-wrap">
            <ElementsInternalLink v-if="data.st_cta" :link-data="data.st_cta">
              <div class="w-full py-1 md:mr-4 md:w-auto md:py-0">
                <span
                  class="inline-block w-full rounded-md bg-secondary px-7 py-5 text-center text-base font-medium leading-4 text-white hover:brightness-90 md:text-lg"
                >
                  {{ data.st_cta.data.lt_text }}
                </span>
              </div>
            </ElementsInternalLink>
          </div>
        </div>
        <div class="px-4 sm:w-full md:w-1/2">
          <ElementsTeaserImage
            :image="data.st_image"
            :alt-text="data.st_image_alt_text"
          />
        </div>
      </div>
      <div
        v-if="data.st_layout.key === 'image-text'"
        class="-mx-4 flex flex-wrap items-center"
      >
        <ElementsTeaserImage
          :image="data.st_image"
          :alt-text="data.st_image_alt_text"
        />
        <ElementsTeaserText :headline="data.st_headline" :text="data.st_text" />
        <ElementsInternalLink v-if="data.st_cta" :link-data="data.st_cta">
          <button class="btn btn-primary">
            {{ data.st_cta.data.lt_text }}
          </button>
        </ElementsInternalLink>
      </div>
    </div>
  </section>
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
