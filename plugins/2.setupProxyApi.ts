import { FSXAContentMode, FSXAProxyApi, LogLevel } from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  let url = new URL('/api', runtimeConfig.public['baseURL']).href
  if (runtimeConfig.public['kubernetesURL']) {
    url = 'http://0.0.0.0:3000/api'
  }
  const fsxaApi = new FSXAProxyApi(
    url,
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
