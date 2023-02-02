import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        "vue",
        {
          "./tests/testutils/nuxtMocks": [
            "defineNuxtPlugin",
            "useRuntimeConfig",
            "useAppConfig",
            "useState",
            "useNuxtApp",
            "useLocale",
            "useAsyncData",
            "fetchTopLevelNavigation",
          ],
        },
      ],
    }),
  ],
});
