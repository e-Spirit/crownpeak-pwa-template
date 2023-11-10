<template>
  <div>
    <p class="tracking-px text-text mb-7 text-sm font-semibold uppercase">
      {{ data.st_subline }}
    </p>
    <h2
      class="tracking-px-n font-heading text-primary mb-8 text-3xl font-bold leading-none md:text-4xl"
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
