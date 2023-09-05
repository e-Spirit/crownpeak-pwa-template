import * as os from 'os'
import { FSXAContentMode, FSXAProxyApi, LogLevel } from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const clientUrl = '/api'
  const serverUrl = 'https://dp-reference-pwa-feature-edit.netlify.app/api'
  const fsxaApi = new FSXAProxyApi(
    process.client ? clientUrl : serverUrl,
    Number.parseInt(runtimeConfig.public['logLevel']) ||
      appConfig.logLevel ||
      LogLevel.NONE
  )
  if (!process.client) {
    // eslint-disable-next-line no-console
    console.log(
      'NWInterfaces: ' + JSON.stringify(os.networkInterfaces(), null, 2)
    )
  }
  return {
    provide: {
      fsxaApi,
      isPreviewMode: runtimeConfig.public.mode === FSXAContentMode.PREVIEW
    }
  }
})
