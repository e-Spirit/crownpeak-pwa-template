<template>
  <div class="font-bold border p-4 bg-teal-200" data-testid="productSection">
    Product Detail
  </div>
</template>

<script setup lang="ts">
import { DataEntries } from "fsxa-api";
defineProps<{ data: DataEntries }>();
</script>
