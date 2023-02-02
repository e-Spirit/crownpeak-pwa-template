<template>
  <div>
    <div class="font-bold border p-4 bg-red-100">
      {{ activeImage }} {{ data.data }}
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, RichTextElement, Section } from "fsxa-api/dist/types";

interface SliderSlide extends Section {
  data: {
    st_button: {};
    st_description: string;
    st_picture: Image;
    st_picture_alt?: string;
    st_title: RichTextElement[];
  };
}

defineProps<{ data: SliderSlide[] }>();

const activeImage = ref(0);
</script>
