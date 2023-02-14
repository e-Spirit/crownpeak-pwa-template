import eslintPlugin from "vite-plugin-eslint";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
  },
  css: ["@/assets/css/main.css", "@/assets/css/transitions.css"],
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
    // TODO: remove this block if it works without
    // build: {
    //   rollupOptions: {
    //     external: ["fsxa-api"],
    //   },
    // },
  },
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      baseURL: process.env["BASE_URL"] || "http://localhost:3000",
      logLevel: process.env["FSXA_LOG_LEVEL"],
    },
    private: {
      apiKey: process.env["FSXA_API_KEY"],
      navigationService: process.env["FSXA_NAVIGATION_SERVICE"],
      caas: process.env["FSXA_CAAS"],
      projectId: process.env["FSXA_PROJECT_ID"],
      tenantId: process.env["FSXA_TENANT_ID"],
      remotes: process.env["FSXA_REMOTES"],
      maxReferenceDepth: process.env["FSXA_MAX_REFERENCE_DEPTH"],
      mode: process.env["FSXA_MODE"],
      devMode: process.env["FSXA_DEV_MODE"],
      snapUrl: process.env["FSXA_SNAP_URL"],
      enableEventStream: process.env["FSXA_ENABLE_EVENT_STREAM"],
    },
  },
});
