<template>
  <div>
    <p class="text-text tracking-px mb-7 text-sm font-semibold uppercase">
      {{ data.st_subline }}
    </p>
    <h2
      class="font-heading tracking-px-n text-primary mb-8 text-3xl font-bold leading-none md:text-4xl"
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
export type AccordionItem = {
  st_content: [
    {
      data?: Object
      content: [
        {
          type: string
          content: string
          data?: Object
        }
      ]
      type: string
    }
  ]
  st_title: string
}
interface Accordion {
  st_accordion: [
    {
      data: AccordionItem
      id: string
      previewId: string
    }
  ]
  st_headline: string
  st_subline: string
}

defineProps<{ data: Accordion }>()
</script>

<style scoped></style>
