// TODO write some tests
import {
  FSXAContentMode,
  FSXAProxyApi,
  FSXARemoteApi,
  FSXARemoteApiConfig,
  LogLevel
} from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const { $logger } = useNuxtApp()
  const runtimeConfig = useRuntimeConfig() // .env
  const appConfig = useAppConfig() // app.config.ts
  const logLevel =
    Number.parseInt(runtimeConfig.public['logLevel']) ||
    appConfig.logLevel ||
    LogLevel.NONE
  const createProxyApi: () => FSXAProxyApi = () => {
    $logger.debug('Creating FSXAProxyApi...')
    if (!process.client) {
      throw new Error('ProxyAPI shall not pass')
    }
    return new FSXAProxyApi('/api', logLevel)
  }

  const createRemoteApi: () => FSXARemoteApi = () => {
    $logger.debug('Creating FSXARemoteApi...')
    const remoteApiConfig: FSXARemoteApiConfig = {
      apikey: runtimeConfig.private.apiKey,
      caasURL: runtimeConfig.private.caas,
      navigationServiceURL: runtimeConfig.private.navigationService,
      tenantID: runtimeConfig.private.tenantId,
      maxReferenceDepth:
        (parseInt(runtimeConfig.private['maxReferenceDepth']) || null) ??
        (appConfig?.['maxReferenceDepth'] as number | undefined),
      projectID: runtimeConfig.private.projectId,
      remotes: runtimeConfig.private.remotes
        ? typeof runtimeConfig.private.remotes === 'string'
          ? JSON.parse(runtimeConfig.private.remotes)
          : runtimeConfig.private.remotes
        : {},
      contentMode: runtimeConfig.public.mode as FSXAContentMode,
      logLevel,
      enableEventStream:
        !!runtimeConfig.public['enableEventStream'] ||
        appConfig.enableEventStream ||
        false
    }
    return new FSXARemoteApi(remoteApiConfig)
  }

  const createContentApi: () => FSXAProxyApi | FSXARemoteApi = () => {
    $logger.debug('Creating content-api instance')
    if (process.client) {
      return createProxyApi()
    } else {
      return createRemoteApi()
    }
  }

  return {
    provide: {
      createContentApi
    }
  }
})
