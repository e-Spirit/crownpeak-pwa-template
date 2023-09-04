import { FSXAContentMode, FSXAProxyApi, LogLevel } from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public['baseURL'] as string
  const appConfig = useAppConfig()
  const serverUrl =
    baseUrl && baseUrl !== '' ? baseUrl : 'http://0.0.0.0:3000/api'
  const proxyUrl = process.client ? new URL('/api', serverUrl).href : serverUrl
  const fsxaApi = new FSXAProxyApi(
    proxyUrl,
    Number.parseInt(runtimeConfig.public['logLevel']) ||
      appConfig.logLevel ||
      LogLevel.NONE
  )
  return {
    provide: {
      fsxaApi,
      isPreviewMode: runtimeConfig.public.mode === FSXAContentMode.PREVIEW
    }
  }
})
