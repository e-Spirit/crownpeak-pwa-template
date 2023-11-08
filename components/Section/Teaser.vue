<template>
  <div
    class="grid items-center gap-8 py-10 md:grid-cols-2"
    data-testid="teaserSection"
  >
    <div class="flex flex-col space-y-3 p-4 md:p-0">
      <h3 class="text-xl text-gray-600" data-preview-id="#st_kicker">
        {{ data.st_kicker }}
      </h3>
      <h2
        v-if="data.st_headline"
        class="text-4xl font-black uppercase"
        data-preview-id="#st_headline"
      >
        {{ data.st_headline }}
      </h2>
      <p v-if="data.st_text" class="text-gray-600" data-preview-id="#st_text">
        <ElementsRichText :richtext="data.st_text" />
      </p>
    </div>

    <div
      v-if="data?.st_picture && typeof data.st_picture !== 'string'"
      class="relative"
    >
      <div
        class="absolute -top-10 -z-10 hidden h-3/4 w-1/2 border-[12px] border-gray-100 md:block"
      />

      <div class="md:pl-10">
        <ElementsImage
          v-if="data?.st_picture"
          :data-preview-id="data.st_picture?.previewId"
          :image="data.st_picture"
          :alt="data.st_picture_alt"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Image, RichTextElement } from 'fsxa-api'

interface Teaser {
  st_headline: RichTextElement[]
  st_jumbo_headline: string
  st_kicker: string
  st_picture?: Image
  st_picture_alt?: string
  st_text: RichTextElement[]
  st_button: {
    data: {
      lt_button_text: string
      lt_internal: {
        referenceId: string
        referenceType: string
      }
    }
  } | null
}

defineProps<{ data: Teaser }>()
</script>
