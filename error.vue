<template>
  <div>
    ERROR LAYOUT
    {{ props.error }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message: string } }>();
</script>
