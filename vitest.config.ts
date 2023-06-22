/// <reference types="vitest" />
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import { configure } from '@testing-library/vue'

configure({})

export default defineConfig({
  test: {
    environment: 'jsdom',
    typecheck: {
      tsconfig: './tests/tsconfig.json'
    }
  },
  resolve: {
    alias: {
      '~': __dirname
    }
  },
  plugins: [
    AutoImport({
      imports: [
        'vue',
        {
          '/tests/testutils/nuxtMocks': [
            'defineNuxtPlugin',
            'useRuntimeConfig',
            'useAppConfig',
            'useState',
            'useContent',
            'useProjectProperties',
            'useNavigationData',
            'useRoute',
            'useRouter',
            'useNuxtApp',
            'useHead',
            'useDev',
            'navigateTo',
            'createError',
            'definePageMeta',
            'useLocale',
            'useAsyncData',
            'fetchTopLevelNavigation',
            'fetchPageRoute',
            'fetchDatasetById',
            'fetchPageById',
            'fetchNavigationItemFromRoute',
            'fetchProducts',
            'getLocaleFromNavigationItem'
          ]
        }
      ]
    }),
    Vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return ['DevOnly', 'ClientOnly', 'NuxtLink'].includes(tag)
          }
        }
      }
    })
  ]
})
