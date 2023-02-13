<template>
  <span>
    <NuxtLink
      v-if="richTextElement.data.template === 'internal_link'"
      class="underline"
      :to="internalLinkRoute"
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

const { navigationData } = useNavigationData();

interface RichTextLink {
  type: "link";
  content: RichTextElement[];
  data: Link;
}

const props = defineProps<{ richTextElement: RichTextLink }>();

const internalLinkRoute = computed(() => {
  const referenceId: string =
    props.richTextElement.data.data["lt_link"]?.referenceId;
  if (!referenceId) return "";
  const target = navigationData.value?.idMap[referenceId];
  if (target) return target.seoRoute;
  return "";
});
</script>
