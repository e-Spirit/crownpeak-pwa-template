<template>
  <span>{{ richTextElement.content }}</span>
</template>
<script setup lang="ts">
interface RichTextText {
  type: "text";
  content: string;
  data: Record<string, any>;
}
defineProps<{ richTextElement: RichTextText }>();
</script>
