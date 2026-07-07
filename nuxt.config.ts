import { fileURLToPath, URL } from 'node:url'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  compatibilityDate: '2025-11-25',
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
    resolve: {
      alias: {
        util: 'rollup-plugin-node-polyfills/polyfills/util',
        'node:crypto': fileURLToPath(new URL('./utils/crypto-stub.ts', import.meta.url)),
        // better-sse is server-only, stub it for client builds
        'better-sse': fileURLToPath(new URL('./utils/better-sse-stub.ts', import.meta.url))
      }
    },
    optimizeDeps: {
      include: ['fsxa-api'],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    },
    server: {
      allowedHosts: process.env['NUXT_ALLOWED_HOSTS']?.split(',') || ['localhost']
    }
  },
  modules: ['nuxt-viewport'],
  typescript: {
    typeCheck: 'build' // Only type-check during build, not in dev mode
  },
  runtimeConfig: {
    // the environment variables follow a strict naming convention, enforced by nuxt.
    // if you want to override the values during runtime
    // they need to be: NUXT_PUBLIC_<KEY> or NUXT_PRIVATE_<KEY>, where KEY is the capitalized key of the object key (logLevel -> NUXT_PUBLIC_LOG_LEVEL)
    // If you change baseUrl: process.env['NUXT_PUBLIC_SOMETHING_ELSE'], setting NUXT_PUBLIC_SOMETHING_ELSE will only work during build time
    public: {
      logLevel: process.env['NUXT_PUBLIC_LOG_LEVEL'],
      mode: process.env['NUXT_PUBLIC_MODE'],
      enableEventStream: process.env['NUXT_PUBLIC_ENABLE_EVENT_STREAM'],
      defaultLocale: process.env['NUXT_PUBLIC_DEFAULT_LOCALE']
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
