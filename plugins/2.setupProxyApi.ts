import { FSXAContentMode, FSXAProxyApi, LogLevel } from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const clientUrl = '/api'
  const serverUrl = runtimeConfig.public['baseUrl'] + '/api'
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
