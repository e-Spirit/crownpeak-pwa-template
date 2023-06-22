<template>
  <u
    v-for="(item, index) in richTextElement.content"
    :key="'listitem-' + index"
  >
    <ElementsRichTextElement
      v-if="typeof item !== 'string'"
      :rich-text-element="item as RichTextElement"
    />
    <span v-else v-html="item"></span>
  </u>
</template>

<script setup lang="ts">
import { RichTextElement } from 'fsxa-api'
defineProps<{ richTextElement: RichTextElement }>()
</script>
