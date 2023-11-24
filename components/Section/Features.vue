<template>
  <section class="py-14">
    <div class="container mx-auto px-4 text-center">
      <h2
        class="tracking-px-n mb-8 font-heading text-3xl font-bold leading-none text-primary md:text-4xl"
      >
        {{ props.data.st_headline }}
      </h2>
      <p class="mb-6 text-xl font-semibold leading-7 text-coolGray-500">
        <ElementsRichText :richtext="props.data.st_text" />
      </p>
      <div class="-m-8 flex flex-wrap text-left">
        <SectionFeature
          v-for="feature in props.data.st_features"
          :key="feature.id"
          :data="feature.data"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Features } from 'types'

const props = defineProps<{ data: Features }>()
</script>

<style scoped></style>
