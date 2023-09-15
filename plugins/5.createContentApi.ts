import { FSXAApi } from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const { $logger } = useNuxtApp()
  const runtimeConfig = useRuntimeConfig() // .env
  const appConfig = useAppConfig() // app.config.ts

  const createContentApi: () => FSXAApi = () => {
    $logger.debug('Creating content-api instance')
    if (process.client) {
      return createProxyApi()
    } else {
      return createRemoteApi(runtimeConfig, appConfig)
    }
  }

  return {
    provide: {
      createContentApi
    }
  }
})
