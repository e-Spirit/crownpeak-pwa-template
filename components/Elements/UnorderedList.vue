<template>
  <ul class="list-inside list-disc">
    <li
      v-for="(item, index) in richTextElement.content"
      :key="'listitem-' + index"
    >
      <ElementsRichText
        v-if="getRichtext(item)"
        :richtext="getRichtext(item)!"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RichTextElement } from 'fsxa-api'
defineProps<{ richTextElement: RichTextElement }>()

function getRichtext(item: string | RichTextElement) {
  if (typeof item === 'string' || !item.content) return
  return item.content as RichTextElement[]
}
</script>
