<template>
  <section class="py-4">
    <button
      class="border-fs-button-bg group container relative mx-auto flex h-32 items-center justify-center border border-dashed hover:bg-gray-50"
      :onclick="() => $createSection(bodyName)"
    >
      <div
        class="h-16 w-16 cursor-pointer space-x-2 rounded-full bg-blue-600 px-4 py-2 text-center text-4xl font-thin text-white antialiased group-hover:bg-blue-900"
      >
        +
      </div>
    </button>
  </section>
</template>

<script setup lang="ts">
defineProps<{ bodyName: string }>()
</script>
