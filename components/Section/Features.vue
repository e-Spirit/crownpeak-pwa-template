<template>
  <div>
    <h2
      class="tracking-px-n font-heading text-primary mb-8 text-3xl font-bold leading-none md:text-4xl"
    >
      {{ props.data.st_headline }}
    </h2>
    <ElementsRichText :richtext="props.data.st_text" />
    <div class="-m-8 flex flex-wrap text-left">
      <SectionFeature
        v-for="feature in props.data.st_features"
        :key="feature.id"
        :data="feature.data"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Features } from 'types'

const props = defineProps<{ data: Features }>()
</script>

<style scoped></style>
