/// <reference types="vitest" />
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import { configure } from "@testing-library/vue";

configure({});

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        "vue",
        {
          "/tests/testutils/nuxtMocks": [
            "defineNuxtPlugin",
            "useRuntimeConfig",
            "useAppConfig",
            "useState",
            "useContent",
            "useProjectProperties",
            "useNavigationData",
            "useRoute",
            "useRouter",
            "useNuxtApp",
            "useHead",
            "useDev",
            "navigateTo",
            "createError",
            "definePageMeta",
            "useLocale",
            "useAsyncData",
            "fetchTopLevelNavigation",
            "fetchNavigationItemFromRoute",
            "fetchProducts",
            "getLocaleFromNavigationItem",
          ],
        },
      ],
    }),
    Vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return ["DevOnly", "ClientOnly", "NuxtLink"].includes(tag);
          },
        },
      },
    }),
  ],
});
