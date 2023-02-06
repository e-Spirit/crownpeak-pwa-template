<template>
  <div
    class="relative border bg-red-100 p-4 font-bold"
    data-testid="headerSection"
  >
    <Dev :content="data" />
    Page Header
  </div>
</template>

<script setup lang="ts">
type PageHeader = {};
defineProps<{ data: PageHeader }>();
</script>
