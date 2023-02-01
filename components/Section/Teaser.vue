<template>
  <div>
    <div class="font-bold border p-4 bg-teal-100">
      Teaser
      <button @click="showData = !showData">Show Data</button>
      <pre v-if="showData">{{ JSON.stringify(data, null, 2) }}</pre>
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

const showData = ref(false);

defineProps<{ data: Teaser }>();
</script>
