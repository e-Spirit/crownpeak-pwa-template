import * as os from 'os'
import { FSXAContentMode, FSXAProxyApi, LogLevel } from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const clientUrl = '/api'
  const serverUrl = 'http://localhost:3000/api'
  const fsxaApi = new FSXAProxyApi(
    process.client ? clientUrl : serverUrl,
    Number.parseInt(runtimeConfig.public['logLevel']) ||
      appConfig.logLevel ||
      LogLevel.NONE
  )
  if (!process.client) {
    // eslint-disable-next-line no-console
    console.log('NWInterfaces: ' + os.networkInterfaces())
  } else {
    // eslint-disable-next-line no-console
    console.log('I CLIENTSITE')
  }
  return {
    provide: {
      fsxaApi,
      isPreviewMode: runtimeConfig.public.mode === FSXAContentMode.PREVIEW
    }
  }
})
