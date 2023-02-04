<template>
  <div
    class="relative grid grid-cols-2 gap-4 p-4 py-20 text-white"
    data-testid="interestingFactsSection"
  >
    <div
      v-if="data.st_background_image"
      class="absolute inset-0 -z-10 bg-black bg-opacity-75"
    />
    <div v-if="data.st_background_image" class="absolute inset-0 -z-20">
      <ElementsImage
        class="h-full w-full object-cover"
        :image="data.st_background_image"
      />
    </div>

    <div>
      <h3>{{ data.st_tagline }}</h3>
      <h2>{{ data.st_headline }}</h2>
      <p v-if="data.st_text"><ElementsRichText :richtext="data.st_text" /></p>
    </div>

    <div class="grid grid-cols-3">
      <div v-for="counter in data.st_counters" :key="counter.id">
        <div class="text-4xl">{{ counter.data.st_number }}</div>
        <div>{{ counter.data.st_text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, RichTextElement } from "fsxa-api";

interface InterestingFacts {
  st_background_image: Image;
  st_headline: string;
  st_tagline: string;
  st_text: RichTextElement[];
  st_counters: { id: string; data: { st_number: Number; st_text: string } }[];
}

defineProps<{ data: InterestingFacts }>();
</script>
