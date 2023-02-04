<template>
  <div
    class="border bg-orange-200 p-4 font-bold"
    data-testid="productCategorySection"
  >
    Product Category
  </div>
</template>

<script setup lang="ts">
import { DataEntries } from "fsxa-api";
defineProps<{ data: DataEntries }>();
</script>
