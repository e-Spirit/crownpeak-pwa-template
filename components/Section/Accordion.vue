<template>
  <div>
    <p class="tracking-px mb-7 text-sm font-semibold uppercase text-text">
      {{ data.st_subline }}
    </p>
    <h2
      class="tracking-px-n mb-8 font-heading text-3xl font-bold leading-none text-primary md:text-4xl"
    >
      {{ data.st_headline }}
    </h2>

    <ElementsAccordionItem
      v-for="item in data.st_accordion"
      :key="item.id"
      :data="item.data"
    />
  </div>
</template>

<script setup lang="ts">
import { Accordion } from 'types'

defineProps<{ data: Accordion }>()
</script>

<style scoped></style>
