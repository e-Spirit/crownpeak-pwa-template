import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/css/main.css', '@/assets/css/transitions.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vite: {
    plugins: [eslintPlugin()],
    resolve: {
      alias: {
        util: 'rollup-plugin-node-polyfills/polyfills/util'
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    }
  },
  typescript: {
    typeCheck: true
  },
  runtimeConfig: {
    // the environment variables follow a strict naming convention, enforced by nuxt.
    // if you want to override the values during runtime
    // they need to be: NUXT_PUBLIC_<KEY> or NUXT_PRIVATE_<KEY>, where KEY is the capitalized key of the object key (logLevel -> NUXT_PUBLIC_LOG_LEVEL)
    // If you change baseUrl: process.env['NUXT_PUBLIC_SOMETHING_ELSE'], setting NUXT_PUBLIC_SOMETHING_ELSE will only work during build time
    public: {
      baseURL: process.env['NUXT_PUBLIC_BASE_URL'],
      logLevel: process.env['NUXT_PUBLIC_LOG_LEVEL'],
      mode: process.env['NUXT_PUBLIC_MODE'],
      snapUrl: process.env['NUXT_PUBLIC_SNAP_URL'],
      enableEventStream: process.env['NUXT_PUBLIC_ENABLE_EVENT_STREAM'],
      defaultLocale: process.env['NUXT_PUBLIC_DEFAULT_LOCALE'],
      kubernetesURL: process.env['NUXT_PUBLIC_KUBERNETES_URL']
    },
    private: {
      apiKey: process.env['NUXT_PRIVATE_API_KEY'],
      navigationService: process.env['NUXT_PRIVATE_NAVIGATION_SERVICE'],
      caas: process.env['NUXT_PRIVATE_CAAS'],
      projectId: process.env['NUXT_PRIVATE_PROJECT_ID'],
      tenantId: process.env['NUXT_PRIVATE_TENANT_ID'],
      remotes: process.env['NUXT_PRIVATE_REMOTES'],
      maxReferenceDepth: process.env['NUXT_PRIVATE_MAX_REFERENCE_DEPTH'],
      devMode: process.env['NUXT_PRIVATE_DEV_MODE']
    }
  }
})
