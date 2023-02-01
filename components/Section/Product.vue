<template>
  <div class="font-bold border p-4 bg-teal-200">Product Detail</div>
</template>

<script setup lang="ts">
import { DataEntries } from "fsxa-api/dist/types";
defineProps<{ data: DataEntries }>();
</script>
