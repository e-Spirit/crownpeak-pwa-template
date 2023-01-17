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
    },
    private: {
      fsxaApiKey: process.env["FSXA_API_KEY"],
    },
  },
});
