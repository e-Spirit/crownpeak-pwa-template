<template>
  <div
    class="font-bold border p-4 bg-orange-200"
    data-testid="productCategorySection"
  >
    Product Category
  </div>
</template>

<script setup lang="ts">
import { DataEntries } from "fsxa-api/dist/types";
defineProps<{ data: DataEntries }>();
</script>
