<template>
  <div class="border-b py-2">
    <div class="flex items-center container mx-auto">
      <img src="/logo.png" /><span>NAVBAR</span>
      <ul v-for="navItem of topNavigation" :key="navItem.key">
        <NuxtLink
          :to="`${navItem.path}`"
          class="flex flex-col hover:bg-blue-400 p-3"
        >
          <span class="font-bold text-lg">{{ navItem.label }}</span>
        </NuxtLink>
      </ul>
      <ul v-for="locale of config.allLocales" :key="locale">
        <button
          class="p-3"
          :class="
            locale === config.activeLocale ? 'bg-green-300' : 'bg-gray-50'
          "
          @click="setLocale(locale)"
        >
          <span class="font-bold text-lg">{{ locale }}</span>
        </button>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { config, setLocale } = useLocale();
const { navigationData } = useNavigationData();

const topNavigation = computed(() => {
  return (navigationData?.value?.structure ?? []).map((item) => ({
    key: item.id,
    label: navigationData?.value?.idMap[item.id]?.label ?? "",
    path: navigationData?.value?.idMap[item.id]?.seoRoute ?? "",
  }));
});
</script>
