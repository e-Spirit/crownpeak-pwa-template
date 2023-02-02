/// <reference types="vitest" />
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        "vue",
        {
          "../../tests/testutils/nuxtMocks": [
            "defineNuxtPlugin",
            "useRuntimeConfig",
            "useAppConfig",
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
