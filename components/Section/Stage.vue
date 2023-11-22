<template>
  <section
    class="overflow-hidden bg-black bg-cover bg-fixed bg-center bg-no-repeat py-28"
    :style="sectionBackground"
  >
    <div class="container mx-auto px-4">
      <div
        class="rounded-4xl bg-black bg-opacity-80 px-12 pb-9 pt-12 md:max-w-xl"
      >
        <h2
          class="font-heading tracking-px-n mb-4 text-5xl font-bold leading-tight text-white md:text-6xl"
        >
          {{ props.data.st_headline }}
        </h2>
        <p class="mb-11 text-lg font-medium leading-normal text-gray-300">
          {{ props.data.st_subheadline }}
        </p>
        <ElementsInternalLink
          v-if="data.st_cta"
          :link-data="data.st_cta"
          class="inline-flex flex-wrap items-center text-white hover:text-gray-200"
        >
          <span class="mr-2 font-semibold leading-normal">{{
            data.st_cta.data.lt_text
          }}</span>
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 3.75L16.25 9M16.25 9L11 14.25M16.25 9L2.75 9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </ElementsInternalLink>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Image } from 'fsxa-api'
import { InternalLink } from 'types'

interface StageData {
  st_headline: string
  st_subheadline: string
  st_image: Image
  st_image_alt_text?: string
  st_cta?: InternalLink
}

function useBreakpoints() {
  const windowWidth = ref(window.innerWidth)

  const onWidthChange = () => (windowWidth.value = window.innerWidth)
  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  const res = computed(() => {
    if (windowWidth.value < 550) return '9x16_M'
    if (windowWidth.value >= 550 && windowWidth.value < 1200) return '16x6_L'
    if (windowWidth.value >= 1200) return '16x6_XL'
    return '16x9_L' // This is an unreachable line, simply to keep eslint happy.
  })

  return res
}

const props = defineProps<{ data: StageData }>()
const sectionBackground = {
  backgroundImage: `url(${
    props.data.st_image.resolutions[useBreakpoints().value]?.url
  })`
}
</script>
