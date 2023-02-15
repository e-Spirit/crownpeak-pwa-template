<template>
  <div
    class="grid items-center gap-8 py-10 md:grid-cols-2"
    data-testid="teaserSection"
  >
    <div class="flex flex-col space-y-2 p-4 md:p-0">
      <h3 class="text-xl uppercase text-gray-800">{{ data.st_kicker }}</h3>
      <h2 v-if="data.st_headline" class="text-3xl font-bold uppercase">
        <ElementsRichText :richtext="data.st_headline" />
      </h2>
      <p v-if="data.st_text" class="text-gray-800">
        <ElementsRichText :richtext="data.st_text" />
      </p>
    </div>

    <div v-if="data.st_picture">
      <ElementsImage
        v-if="data.st_picture"
        :image="data.st_picture"
        :alt="data.st_picture_alt"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Image, RichTextElement } from "fsxa-api";

interface Teaser {
  st_headline: RichTextElement[];
  st_jumbo_headline: string;
  st_kicker: string;
  st_picture?: Image;
  st_picture_alt?: string;
  st_text: RichTextElement[];
  st_button: {
    data: {
      lt_button_text: string;
      lt_internal: {
        referenceId: string;
        referenceType: string;
      };
    };
  } | null;
}

defineProps<{ data: Teaser }>();
</script>
