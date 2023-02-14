<template>
  <div
    class="sticky top-0 z-30 border-b bg-white p-2"
    data-testid="layoutHeader"
  >
    <div class="container mx-auto flex items-center">
      <NuxtLink to="/"
        ><ElementsImage
          v-if="projectProperties?.data && projectProperties?.data['ps_logo']"
          class="w-30 h-12 object-contain"
          :image="projectProperties?.data['ps_logo']"
      /></NuxtLink>

      <div class="relative ml-auto flex">
        <AppLayoutNavigation class="hidden md:flex" />
        <AppLayoutMobileNavigation
          v-if="mobileNavigationVisible"
          class="z-40 md:hidden"
          @close="mobileNavigationVisible = false"
        />

        <AppLayoutLanguageSwitch class="ml-2" />
        <button
          class="md:hidden"
          @click="mobileNavigationVisible = !mobileNavigationVisible"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mobileNavigationVisible = ref(false);
const { projectProperties } = useProjectProperties();
</script>
