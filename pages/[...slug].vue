<template>
  <div>
    <pre>{{ JSON.stringify(page, undefined, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data: page } = useContent();
</script>
