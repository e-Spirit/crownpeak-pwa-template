<template>
  <section class="py-14">
    <div class="container mx-auto px-4 text-center md:max-w-4xl">
      <p class="tracking-px mb-7 text-sm font-semibold uppercase text-text">
        {{ data.st_subline }}
      </p>
      <h2
        class="tracking-px-n mb-8 font-heading text-3xl font-bold leading-none text-primary md:text-4xl"
      >
        {{ data.st_headline }}
      </h2>

      <div class="-m-1 mb-11 flex flex-wrap text-left">
        <ElementsAccordionItem
          v-for="item in data.st_accordion"
          :key="item.id"
          :data="item.data"
        />
      </div>
      <div>
        <p class="mb-5 font-medium text-coolGray-500">
          <ElementsRichText :richtext="data.st_info" />
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Accordion } from 'types'

defineProps<{ data: Accordion }>()
</script>

<style scoped></style>
