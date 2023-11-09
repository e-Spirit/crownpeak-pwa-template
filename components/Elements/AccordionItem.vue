<template>
  <div>
    <h4 @click="toggle">
      {{ data.st_title }}
    </h4>
    <div v-show="state.open">
      <p v-for="paragraph in paragraphs" :key="paragraph">
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface AccordionItem {
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

const props = defineProps<{ data: AccordionItem }>()

const state = reactive({
  open: false
})

const toggle = () => {
  state.open = !state.open
}

const paragraphs = computed(() => {
  return props.data.st_content
    .filter((item) => item.type === 'paragraph')
    .flatMap((item) => item.content)
    .filter((item) => item.type === 'text')
    .map((item) => item.content)
})
</script>

<style scoped></style>
