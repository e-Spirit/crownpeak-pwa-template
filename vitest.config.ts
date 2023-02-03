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
            "useNavigationData",
            "useNuxtApp",
            "useHead",
            "definePageMeta",
            "useLocale",
            "useAsyncData",
            "fetchTopLevelNavigation",
          ],
        },
      ],
    }),
    Vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return ["DevOnly"].includes(tag);
          },
        },
      },
    }),
  ],
});
