import type { Logger, FSXAApi } from 'fsxa-api'

declare module '#app' {
  interface NuxtApp {
    $isPreviewMode: boolean
    $logger: Logger
    $createContentApi: () => FSXAApi
    $setPreviewId: (previewId: string | undefined) => Promise<void>
    $createSection: (bodyName: string) => Promise<unknown>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $isPreviewMode: boolean
    $logger: Logger
    $createContentApi: () => FSXAApi
    $setPreviewId: (previewId: string | undefined) => Promise<void>
    $createSection: (bodyName: string) => Promise<unknown>
  }
}

export {}
