<template>
  <div>
    <span>{{ data.st_subline }}</span>
    <h2>{{ data.st_headline }}</h2>
    <ElementsRichText :richtext="data.st_text" />
    <div class="flex flex-wrap px-4 text-left">
      <SectionStepsItem
        v-for="(sectionData, index) in data.st_steps"
        :key="sectionData.id"
        :data="sectionData.data"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { StepsSectionData } from 'types'
defineProps<{ data: StepsSectionData }>()
</script>

<style scoped></style>
