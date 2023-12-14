<template>
  <section class="py-14">
    <div class="container mx-auto px-4 text-center">
      <div class="mx-auto mb-16 max-w-5xl md:mb-24">
        <span
          class="mb-4 inline-block rounded-full bg-gray-100 px-2 py-px text-xs font-medium uppercase leading-5 text-secondary shadow-sm"
          >{{ data.st_subline }}</span
        >
        <h2
          class="tracking-px-n mb-8 font-heading text-3xl font-bold leading-none text-primary md:text-4xl"
        >
          {{ data.st_headline }}
        </h2>
        <p class="mb-6 text-xl font-semibold leading-7 text-coolGray-500">
          <ElementsRichText :richtext="data.st_text" />
        </p>
      </div>
      <div class="flex flex-wrap px-4 text-left">
        <SectionStepsItem
          v-for="(sectionData, index) in data.st_steps"
          :key="sectionData.id"
          :data="sectionData.data"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { StepsSectionData } from 'types'
defineProps<{ data: StepsSectionData }>()
</script>

<style scoped></style>
