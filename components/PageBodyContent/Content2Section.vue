<template>
  <div data-testid="content2section">
    <DevOnly v-if="!content2SectionComponent">
      <Unknown :content="content" />
    </DevOnly>
    <component :is="content2SectionComponent" :content="content" />
  </div>
</template>

<script setup lang="ts">
import { Content2Section } from "fsxa-api";

const props = defineProps<{ content: Content2Section }>();

const content2SectionComponent = computed(() => {
  switch (props.content.sectionType) {
    // TODO
    default:
      return undefined;
  }
});
</script>
