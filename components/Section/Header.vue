<template>
  <section
    class="group relative"
    data-testid="headerSection"
    :class="!data['pt_image'] && showDev && $isPreviewMode && devStyle"
  >
    <div v-if="data['pt_headline']" class="h-64">
      <div class="absolute inset-0 flex flex-col justify-center text-white">
        <div class="relative h-full w-full">
          <ElementsImage
            v-if="data['pt_image']"
            class="absolute h-full w-full object-cover"
            :image="data['pt_image']"
            ratio="16x4"
          />
          <div
            class="relative h-full w-full p-6 md:p-12"
            :class="opacity && `bg-black ${opacity}`"
          >
            <div class="container mx-auto px-4">
              <h1
                class="font-heading text-4xl font-bold leading-none text-white md:text-5xl"
              >
                {{ data['pt_headline'] }}
              </h1>
              <p
                class="sm:text-l mt-12 font-heading leading-tight text-white md:text-xl"
              >
                {{ data['pt_subheadline'] }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dev
      v-if="showDev && $isPreviewMode"
      :content="data"
      class="hidden group-hover:block"
      component-name="Page Header"
    />
  </section>
</template>

<script setup lang="ts">
import { DataEntries } from 'fsxa-api'

const props = defineProps<{ data: DataEntries }>()

const { $isPreviewMode } = useNuxtApp()

const { showDev } = useDev()
const devStyle = 'h-8 border-b'
const opacity = computed(() => {
  const bgOpacity: string = props.data['pt_bgOpacity']['key']
  switch (bgOpacity) {
    case '20':
      return 'bg-opacity-20'
    case '40':
      return 'bg-opacity-40'
    case '60':
      return 'bg-opacity-60'
    case '80':
      return 'bg-opacity-80'
    default:
      return null
  }
})
</script>
