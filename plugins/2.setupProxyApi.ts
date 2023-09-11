import { FSXAContentMode } from 'fsxa-api'
import { createApi } from '~/utils/fsxa'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  // const appConfig = useAppConfig()
  // const clientUrl = '/api'
  // const serverUrl = runtimeConfig.public['baseUrl'] + '/api'
  // const fsxaApi = new FSXAProxyApi(
  //   process.client ? clientUrl : serverUrl,
  //   Number.parseInt(runtimeConfig.public['logLevel']) ||
  //     appConfig.logLevel ||
  //     LogLevel.NONE
  // )
  //
  // // eslint-disable-next-line no-console
  // console.log(`setup Proxy API - Is client? ${process?.client} - mode:
  //   ${process?.mode}`)
  // if (process?.client) {
  //   // eslint-disable-next-line no-console
  //   console.log("if you see me, I'm on a client!")
  //   FSXAApiSingleton.init(fsxaApi)
  // }

  return {
    provide: {
      // fsxaApi: createApi(),
      isPreviewMode: runtimeConfig.public.mode === FSXAContentMode.PREVIEW
    }
  }
})
