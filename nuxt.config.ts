import eslintPlugin from "vite-plugin-eslint";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["@/assets/css/main.css"],
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [eslintPlugin()],
    resolve: {
      alias: {
        util: "rollup-plugin-node-polyfills/polyfills/util",
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env["BASE_URL"],
      fsxaLogLevel: process.env["FSXA_LOG_LEVEL"],
    },
    private: {
      fsxaApiKey: process.env["FSXA_API_KEY"],
      fsxaNavigationService: process.env["FSXA_NAVIGATION_SERVICE"],
      fsxaCaas: process.env["FSXA_CAAS"],
      fsxaProjectId: process.env["FSXA_PROJECT_ID"],
      fsxaTenantId: process.env["FSXA_TENANT_ID"],
      fsxaRemotes: process.env["FSXA_REMOTES"] ?? {},
      fsxaMaxReferenceDepth: process.env["MAX_REFERENCE_DEPTH"],
      fsxaMode: process.env["FSXA_MODE"],
      fsxaDevMode: process.env["FSXA_DEV_MODE"],
      fsxaSnapUrl: process.env["FSXA_SNAP_URL"],
    },
  },
});
