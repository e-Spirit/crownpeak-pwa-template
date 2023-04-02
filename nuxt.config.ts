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
    public: {
      baseURL: process.env['BASE_URL'] || 'http://localhost:3000',
      logLevel: process.env['FSXA_LOG_LEVEL'],
      mode: process.env['FSXA_MODE'],
      snapUrl: process.env['FSXA_SNAP_URL'],
      enableEventStream: process.env['FSXA_ENABLE_EVENT_STREAM']
    },
    private: {
      apiKey: process.env['FSXA_API_KEY'],
      navigationService: process.env['FSXA_NAVIGATION_SERVICE'],
      caas: process.env['FSXA_CAAS'],
      projectId: process.env['FSXA_PROJECT_ID'],
      tenantId: process.env['FSXA_TENANT_ID'],
      remotes: process.env['FSXA_REMOTES'],
      maxReferenceDepth: process.env['FSXA_MAX_REFERENCE_DEPTH'],
      devMode: process.env['FSXA_DEV_MODE']
    }
  }
})
