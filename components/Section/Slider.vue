<template>
  <div data-testid="sliderSection">
    <div class="relative border bg-red-100 p-4 font-bold">
      <Dev v-if="data" :content="data" />
      <!-- {{ activeImage }} {{ data.data }} -->
      <!-- <pre>{{ data }}</pre> -->
      Slider
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, RichTextElement, Section } from "fsxa-api";

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
</script>
