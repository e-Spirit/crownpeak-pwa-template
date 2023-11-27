<template>
  <header data-testid="layoutHeader">
    <div class="px-6 py-6 lg:px-12">
      <nav class="flex">
        <NuxtLink
          to="/"
          class="flex-none"
          @click="mobileNavigationVisible = false"
          ><AppLayoutLogo
        /></NuxtLink>
        <AppLayoutNavigation class="flex" />

        <div class="relative flex grow items-center justify-end">
          <ClientOnly>
            <AppLayoutFavourites />
            <AppLayoutLanguageSwitch
              class="ml-2"
              @language-switch="mobileNavigationVisible = false"
            />
          </ClientOnly>

          <div class="flex">
            <button
              class="md:hidden"
              data-testid="mobileMenuButton"
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
            <transition name="fadeup">
              <AppLayoutMobileNavigation
                v-if="mobileNavigationVisible"
                @close="mobileNavigationVisible = false"
              />
            </transition>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const mobileNavigationVisible = ref(false)
</script>
