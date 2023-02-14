<template>
  <div class="group relative border bg-red-100 p-4" data-testid="headerSection">
    <DevOnly v-if="appDevMode || envDevMode">
      <Dev :content="data" class="hidden group-hover:block" />
    </DevOnly>
    <span class="font-bold">Page Header</span>
  </div>
</template>

<script setup lang="ts">
type PageHeader = {};
defineProps<{ data: PageHeader }>();
const { devMode: appDevMode } = useAppConfig();
const { devMode: envDevMode } = useRuntimeConfig();
</script>
