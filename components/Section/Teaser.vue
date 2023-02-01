<template>
  <div class="border p-4 bg-teal-100 grid grid-cols-2 gap-4">
    <div class="col-span-2 font-bold">Teaser</div>

    <div class="border p-4 flex flex-col space-y-4">
      <h3>{{ data.st_kicker }}</h3>
      <h2><ElementsRichText :richtext="data.st_headline" /></h2>
      <p><ElementsRichText :richtext="data.st_text" /></p>
    </div>

    <div class="border p-4">
      <ElementsImage v-if="data.st_picture" :image="data.st_picture" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Image, RichTextElement } from "fsxa-api/dist/types";

interface Teaser {
  st_headline: RichTextElement[];
  st_jumbo_headline: string;
  st_kicker: string;
  st_picture?: Image;
  st_picture_alt: string | null;
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
