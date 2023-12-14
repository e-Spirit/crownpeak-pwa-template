<template>
  <span
    id="wishlistSize"
    class="absolute bottom-0 right-0 -mb-4 -mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm text-white"
    >{{ amount }}</span
  >
</template>

<script setup lang="ts">
defineProps<{ amount: number }>()
</script>

<style scoped></style>
