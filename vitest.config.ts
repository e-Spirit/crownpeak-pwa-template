/// <reference types="vitest" />
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'
// @ts-ignore
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
      '~': __dirname,
      'tests': `${__dirname}/tests`,
      'better-sse': `${__dirname}/utils/better-sse-stub.ts`
    }
  },
  plugins: [
    {
      name: 'import-meta-client',
      transform(code: string, id: string) {
        if (id.includes('node_modules')) return null
        if (!code.includes('import.meta.client') && !code.includes('import.meta.server')) return null
        return {
          code: code
            .replace(/import\.meta\.client/g, 'globalThis.__importMetaClient__')
            .replace(/import\.meta\.server/g, '!globalThis.__importMetaClient__'),
          map: null
        }
      }
    },
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
            'useRequestEvent',
            'setResponseStatus',
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
          isCustomElement: (tag: string) => {
            return ['DevOnly', 'ClientOnly', 'NuxtLink'].includes(tag)
          }
        }
      }
    })
  ]
})
