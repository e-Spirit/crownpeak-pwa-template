import { FSXAContentMode, FSXAProxyApi, LogLevel } from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public['baseURL'] as string
  const appConfig = useAppConfig()
  const clientUrl = '/api'
  const serverUrl = baseUrl ?? 'http://0.0.0.0:3000/api'
  const proxyUrl = process.client ? clientUrl : serverUrl
  // eslint-disable-next-line no-console
  console.debug('Proxy API initialized with URL: ', proxyUrl)
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
