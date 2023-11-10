<template>
  <div>
    <h4 @click="toggle">
      {{ data.st_title }}
    </h4>
    <div v-show="state.open">
      <ElementsRichText :richtext="props.data.st_content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { AccordionItem } from 'types'

const props = defineProps<{ data: AccordionItem }>()

const state = reactive({
  open: false
})

const toggle = () => {
  state.open = !state.open
}
</script>

<style scoped></style>
