<template>
  <div class="flex border p-4 font-bold" data-testid="languageSwitch">
    <ul v-for="locale of config.allLocales" :key="locale">
      <button
        class="p-3"
        :disabled="loading"
        :data-testid="`${locale}-switch`"
        :data-activeLocale="locale === config.activeLocale"
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
const loading = ref(true);

onMounted(() => {
  loading.value = false;
});
</script>
