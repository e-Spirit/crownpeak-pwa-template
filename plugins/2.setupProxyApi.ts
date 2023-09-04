import { FSXAContentMode, FSXAProxyApi, LogLevel } from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  let clientUrl = '/api'
  const serverUrl = 'http://0.0.0.0:3000/api'
  if (runtimeConfig.public['baseURL']) {
    clientUrl = new URL('/api', runtimeConfig.public['baseURL']).href
  }
  const fsxaApi = new FSXAProxyApi(
    process.client ? clientUrl : serverUrl,
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
