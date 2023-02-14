<template>
  <span>
    <NuxtLink
      v-if="richTextElement.data.template === 'internal_link' && linkedNavItem"
      class="underline"
      :to="internalLinkRoute"
      @click="setActiveNavigationItem(linkedNavItem!)"
    >
      <ElementsRichText :richtext="richTextElement.content" />
    </NuxtLink>
    <a
      v-else
      :href="richTextElement.data.data['lt_url']"
      :target="richTextElement.data.data['lt_link_behavior']?.identifier"
      class="underline"
    >
      <ElementsRichText :richtext="richTextElement.content"
    /></a>
  </span>
</template>

<script setup lang="ts">
import { RichTextElement, Link } from "fsxa-api";

const { navigationData, setActiveNavigationItem } = useNavigationData();

interface RichTextLink {
  type: "link";
  content: RichTextElement[];
  data: Link;
}

const props = defineProps<{ richTextElement: RichTextLink }>();

const linkedNavItem = computed(() => {
  const referenceId: string =
    props.richTextElement.data.data["lt_link"]?.referenceId;
  if (!referenceId) return;
  return navigationData.value?.idMap[referenceId];
});

const internalLinkRoute = computed(() => {
  return linkedNavItem.value?.seoRoute ?? "";
});
</script>
