<template>
  <div
    class="relative grid items-center gap-4 p-4 py-20 text-white lg:h-[800px] lg:grid-cols-2"
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

    <div class="flex flex-col space-y-2 lg:m-16 lg:border-8 lg:p-12">
      <h3 class="text-xl uppercase">{{ data.st_tagline }}</h3>
      <h2
        v-if="data.st_headline"
        class="text-3xl font-black uppercase text-yellow-500 lg:text-5xl"
      >
        {{ data.st_headline }}
      </h2>
      <p v-if="data.st_text" class="text-gray-300">
        <ElementsRichText :richtext="data.st_text" />
      </p>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <div v-for="counter in data.st_counters" :key="counter.id">
        <div class="text-4xl font-bold text-yellow-500">
          {{ counter.data.st_number }}
        </div>
        <div class="max-w-[100px] border-t-2 text-gray-300">
          {{ counter.data.st_text }}
        </div>
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
