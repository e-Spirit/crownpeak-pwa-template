<template>
  <div
    class="relative grid items-center gap-4 p-4 py-20 text-white lg:h-screen lg:grid-cols-2"
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

    <div class="flex flex-col space-y-2 lg:border-8 lg:p-8">
      <h3 class="text-xl uppercase" data-preview-id="#st_tagline" data-inedit>
        {{ data.st_tagline }}
      </h3>
      <h2
        v-if="data.st_headline"
        data-preview-id="#st_headline"
        class="text-3xl font-bold uppercase text-yellow-500 lg:text-5xl"
      >
        {{ data.st_headline }}
      </h2>
      <p v-if="data.st_text" class="text-gray-300" data-preview-id="#st_text">
        <ElementsRichText :richtext="data.st_text" />
      </p>
    </div>

    <div
      class="grid grid-cols-3 gap-6"
      data-preview-id="#st_counters"
      data-inedit
    >
      <div
        v-for="(counter, index) in data.st_counters"
        :key="counter.id"
        :data-preview-id="`#${index}`"
      >
        <div
          class="text-4xl font-bold text-yellow-500"
          data-inedit
          data-preview-id="#st_number"
        >
          {{ counter.data.st_number }}
        </div>
        <div class="border-t-2 text-gray-300" data-preview-id="#st_text">
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
