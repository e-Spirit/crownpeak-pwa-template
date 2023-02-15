<template>
  <div data-testid="sliderSection">
    <div class="group relative">
      <DevOnly v-if="appDevMode || envDevMode">
        <Dev :content="data" class="hidden group-hover:block" />
      </DevOnly>
      <div v-if="activeSlide" class="realtive text-white">
        <div class="sliderButtonContainer left-0">
          <button class="sliderButton pr-8" @click="prevSlide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <div class="sliderButtonContainer right-0">
          <button class="sliderButton pl-8" @click="nextSlide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div
          class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-6 md:p-16"
        >
          <div class="flex max-w-xl flex-col space-y-4 md:py-10">
            <h1 class="text-4xl font-bold md:text-6xl">
              <ElementsRichText :richtext="activeSlide.data.st_title" />
            </h1>
            <p>{{ activeSlide.data.st_description }}</p>
            <div><ElementsButton :button="activeSlide.data.st_button" /></div>
          </div>
        </div>

        <ElementsImage
          class="h-96 w-full object-cover md:h-[600px]"
          :image="activeSlide?.data.st_picture"
        />
      </div>

      <!-- {{ activeImage }} {{ data.data }} -->
      <!-- <pre>{{ activeSlide.data }}</pre> -->
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

const props = defineProps<{ data: SliderSlide[] }>();

const activeImageIndex = ref(0);

const activeSlide = computed(() => props.data[activeImageIndex.value]);

function nextSlide() {
  activeImageIndex.value =
    activeImageIndex.value === props.data.length - 1
      ? 0
      : activeImageIndex.value + 1;
}

function prevSlide() {
  activeImageIndex.value =
    activeImageIndex.value === 0
      ? props.data.length - 1
      : activeImageIndex.value - 1;
}
</script>

<style lang="css" scoped>
.sliderButtonContainer {
  @apply absolute inset-y-0 z-10 my-auto hidden items-center group-hover:flex;
}

.sliderButton {
  @apply bg-white py-10  text-black hover:text-yellow-500;
}
</style>
