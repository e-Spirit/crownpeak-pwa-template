<template>
  <div class="errorPage">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="errorImage"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>

    <h1 class="headline">Error {{ error.statusCode }}</h1>
    <p v-if="error.message || error.statusMessage" class="statusMessage">
      {{ error.statusMessage || error.message }}
    </p>
    <div class="stackTraceContainer">
      <div v-if="error.stack" v-html="error.stack" />
      <div v-else>We don't know anything more about this error.</div>
    </div>
    <div class="buttons">
      <a class="button" href="/">Back to Homepage</a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    message?: string
    statusMessage?: string
    stack?: string
  }
}>()
</script>

<style lang="css" scoped>
.errorImage {
  @apply mx-auto h-12 w-12;
}
.errorPage {
  @apply flex h-full min-h-screen flex-col items-center justify-center p-4;
}
.headline {
  @apply text-center text-4xl font-bold;
}

.statusMessage {
  @apply text-center;
}

.buttons {
  @apply flex justify-center py-4;
}
.button {
  @apply border border-black p-2 hover:bg-gray-200;
}

.stackTraceContainer {
  @apply my-6 max-h-96 max-w-2xl overflow-auto border border-red-800 bg-red-200 p-4;
}
</style>
