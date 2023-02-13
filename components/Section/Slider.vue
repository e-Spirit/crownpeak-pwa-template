<template>
  <div data-testid="sliderSection">
    <div class="group relative border bg-red-100 p-4">
      <DevOnly v-if="appDevMode || envDevMode">
        <Dev :content="data" class="hidden group-hover:block" />
      </DevOnly>

      <!-- {{ activeImage }} {{ data.data }} -->
      <!-- <pre>{{ data }}</pre> -->
      <span class="font-bold">Slider</span>
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

const { devMode: appDevMode } = useAppConfig();
const { devMode: envDevMode } = useRuntimeConfig();

defineProps<{ data: SliderSlide[] }>();
</script>
