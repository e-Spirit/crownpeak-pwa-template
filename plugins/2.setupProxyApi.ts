import * as os from 'os'
import { FSXAContentMode, FSXAProxyApi, LogLevel } from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const clientUrl = '/api'
  const serverUrl = 'http://127.0.0.1:3000/api'
  const fsxaApi = new FSXAProxyApi(
    process.client ? clientUrl : serverUrl,
    Number.parseInt(runtimeConfig.public['logLevel']) ||
      appConfig.logLevel ||
      LogLevel.NONE
  )
  if (!process.client) {
    console.log('NWInterfaces: ' + os.networkInterfaces())
  }
  return {
    provide: {
      fsxaApi,
      isPreviewMode: runtimeConfig.public.mode === FSXAContentMode.PREVIEW
    }
  }
})
