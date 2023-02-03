<template>
  <div
    class="border p-4 bg-teal-100 grid grid-cols-2 gap-4"
    data-testid="teaserSection"
  >
    <div class="col-span-2 font-bold">Teaser</div>

    <div class="border p-4 flex flex-col space-y-4">
      <h3>{{ data.st_kicker }}</h3>
      <h2 v-if="data.st_headline">
        <ElementsRichText :richtext="data.st_headline" />
      </h2>
      <p v-if="data.st_text"><ElementsRichText :richtext="data.st_text" /></p>
    </div>

    <div v-if="data.st_picture" class="border p-4">
      <ElementsImage
        v-if="data.st_picture"
        :image="data.st_picture"
        :alt="data.st_picture_alt"
      />
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
