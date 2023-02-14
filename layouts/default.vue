<template>
  <div class="flex min-h-screen flex-col">
    <AppLayoutLoading v-if="loading" />

    <AppLayoutHeader />
    <div class="container mx-auto flex-grow">
      <div>
        <slot name="header"> Default header content </slot>
      </div>
      <div>
        <slot />
      </div>
    </div>
    <AppLayoutFooter />
  </div>
</template>

<script setup lang="ts">
const { loading } = useLoading();
</script>
