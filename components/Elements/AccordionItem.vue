<template>
  <div class="w-full p-1">
    <div
      class="shadow-10xl rounded-2xl border-2 border-text bg-white bg-opacity-60 px-8 py-7"
    >
      <div class="flex cursor-pointer p-2">
        <button
          class="grow text-left text-lg font-semibold leading-normal text-text"
          @click="toggle"
        >
          {{ data.st_title }}
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-6 w-6 stroke-text stroke-2 duration-200"
          :class="state.open && 'rotate-180'"
          @click="toggle"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          ></path>
        </svg>
      </div>
      <div
        class="max-h-0 w-auto overflow-hidden px-2 transition-[max-height] duration-200 ease-in-out"
        :style="state.style"
      >
        <ElementsRichText :richtext="props.data.st_content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { AccordionItem } from 'types'

const props = defineProps<{ data: AccordionItem }>()

const state = reactive({
  open: false,
  style: computed(() => {
    return state.open ? { maxHeight: '364px' } : {}
  })
})

const toggle = () => {
  state.open = !state.open
}
</script>

<style scoped></style>
