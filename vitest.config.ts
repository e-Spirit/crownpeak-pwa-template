import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

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
          ],
        },
      ],
    }),
  ],
});
