<template>
  <div class="w-full p-8 md:w-1/3">
    <ElementsInternalLink :link-data="props.data.st_link" class="group">
      <div class="mb-9 overflow-hidden rounded-2xl">
        <ElementsImage
          :image="props.data.st_image"
          :alt-text="props.data.st_image_alt_text"
          ratio="16x9"
        />
      </div>
      <h3
        class="mb-4 text-xl font-semibold text-text group-hover:underline md:text-2xl"
      >
        {{ props.data.st_title }}
      </h3>
      <p class="mb-5 font-medium text-coolGray-500">
        <ElementsRichText :richtext="props.data.st_text" />
      </p>
      <p class="mb-5 text-base text-text">
        {{ linkText }}
        <ElementsArrow class="inline stroke-text stroke-2 py-px" />
      </p>
    </ElementsInternalLink>
  </div>
</template>

<script setup lang="ts">
import { Feature } from 'types'
const props = defineProps<{ data: Feature }>()
const linkText = computed(() => props.data.st_link.data.lt_text)
</script>

<style scoped></style>
