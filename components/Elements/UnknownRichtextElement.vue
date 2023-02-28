<template>
  <span
    class="group relative border bg-red-50 p-1 text-red-500"
    data-testid="unknown"
  >
    <Dev
      v-if="$showDev()"
      :content="richTextElement"
      class="hidden group-hover:block"
      component-name="unknown richtext element"
    />
    <span class="font-bold">Unknown Element {{ richTextElement?.type }}</span>
  </span>
</template>
<script lang="ts" setup>
import { RichTextElement } from "fsxa-api/dist/types";

defineProps<{
  richTextElement?: RichTextElement;
}>();
</script>
