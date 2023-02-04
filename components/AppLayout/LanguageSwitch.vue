<template>
  <div class="flex border p-4 font-bold">
    <ul v-for="locale of config.allLocales" :key="locale">
      <button
        class="p-3"
        :class="locale === config.activeLocale ? 'bg-green-300' : 'bg-gray-50'"
        @click="setLocale(locale)"
      >
        <span class="text-lg font-bold">{{ locale }}</span>
      </button>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { config, setLocale } = useLocale();
</script>
