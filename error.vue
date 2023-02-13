<template>
  <div class="p-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="mx-auto h-12 w-12"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>

    <h1 class="text-center text-lg font-bold">Error</h1>
    <div class="errorContainer">
      <pre>{{ props.error }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: { statusCode: number; message: string; stack?: string };
}>();
</script>
