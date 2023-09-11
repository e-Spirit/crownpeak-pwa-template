import {
  FSXAApiSingleton,
  FSXARemoteApi,
  FSXARemoteApiConfig,
  FSXAContentMode,
  LogLevel
} from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig() // .env
  const appConfig = useAppConfig() // app.config.ts

  const { showDev } = useDev()
  showDev.value =
    appConfig?.devMode || runtimeConfig?.private?.devMode === 'true'

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
    logLevel:
      parseInt(runtimeConfig.public['logLevel']) ??
      appConfig.logLevel ??
      LogLevel.NONE,
    enableEventStream:
      !!runtimeConfig.public['enableEventStream'] ||
      appConfig.enableEventStream ||
      false
  }

  // eslint-disable-next-line no-console
  console.log(`setup Remote API - Is client? ${process.client} - mode: 
    ${process.mode}`)
  FSXAApiSingleton.init(new FSXARemoteApi(remoteApiConfig))
})
