<template>
  <div class="mb-12 w-full lg:mb-0 lg:w-1/2">
    <span class="font-bold text-text">{{ category }}</span>
    <h2
      class="tracking-px-n mb-8 font-heading text-3xl font-bold leading-none text-primary md:text-4xl"
    >
      {{ headline }}
    </h2>
    <p class="mb-5 font-medium text-coolGray-500">
      <ElementsRichText :richtext="richtext" />
    </p>
    <div class="flex flex-wrap pt-12">
      <div class="w-full py-1 md:mr-4 md:w-auto md:py-0">
        <ElementsInternalLink
          :link-data="link"
          class="inline-block w-full rounded-md bg-secondary px-7 py-5 text-center text-base font-medium leading-4 text-white hover:brightness-90 md:text-lg"
        >
          {{ link.data.lt_text }}
        </ElementsInternalLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RichTextElement } from 'fsxa-api'
import { InternalLink } from 'types'

defineProps<{
  headline: string
  category: string
  richtext: RichTextElement[]
  link: InternalLink
}>()
</script>

<style scoped></style>
