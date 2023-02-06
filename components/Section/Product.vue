<template>
  <div class="border bg-teal-200 p-4 font-bold" data-testid="productSection">
    Product Detail
  </div>
</template>

<script setup lang="ts">
import { DataEntries } from "fsxa-api";
defineProps<{ data: DataEntries }>();
</script>
