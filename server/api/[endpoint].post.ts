import {
  FSXAApiSingleton,
  FSXARemoteApi,
  FSXARemoteApiConfig,
  FSXAContentMode,
  LogLevel
} from 'fsxa-api'
import { ServerErrors, FSXAProxyRoutes, FSXAApiErrors } from '~/types'

const initSingleton = () => {
  const runtimeConfig = useRuntimeConfig() // .env

  const remoteApiConfig: FSXARemoteApiConfig = {
    apikey: runtimeConfig.private.apiKey,
    caasURL: runtimeConfig.private.caas,
    navigationServiceURL: runtimeConfig.private.navigationService,
    tenantID: runtimeConfig.private.tenantId,
    maxReferenceDepth: parseInt(runtimeConfig.private['maxReferenceDepth']),
    projectID: runtimeConfig.private.projectId,
    remotes: runtimeConfig.private.remotes
      ? typeof runtimeConfig.private.remotes === 'string'
        ? JSON.parse(runtimeConfig.private.remotes)
        : runtimeConfig.private.remotes
      : {},
    contentMode: runtimeConfig.public.mode as FSXAContentMode,
    logLevel:
      Number.parseInt(runtimeConfig.public['logLevel']) || LogLevel.NONE,
    enableEventStream: !!runtimeConfig.public['enableEventStream'] || false
  }
  // TODO: initialize this either in server middleware or at each endpoint
  FSXAApiSingleton.init(new FSXARemoteApi(remoteApiConfig))
}

export default defineEventHandler(async (event) => {
  console.warn('are we initialized yet?')
  initSingleton()
  const remoteApi = FSXAApiSingleton.instance // throws error if undefined
  const body = await readBody(event)
  const endpoint = event.context['params']?.['endpoint']

  // TODO: This is because of a mismatch between the FSXA API and the FSXA Proxy API,
  // should be fixed in a future ticket (TNG-1267)
  body.filters = body.filter

  try {
    switch (`/${endpoint}`) {
      case FSXAProxyRoutes.FETCH_ELEMENT_ROUTE:
        return await remoteApi.fetchElement(body)
      case FSXAProxyRoutes.FETCH_BY_FILTER_ROUTE:
        return await remoteApi.fetchByFilter(body)
      case FSXAProxyRoutes.FETCH_NAVIGATION_ROUTE:
        return await remoteApi.fetchNavigation(body)
      case FSXAProxyRoutes.FETCH_PROPERTIES_ROUTE:
        return await remoteApi.fetchProjectProperties(body)
      default:
        throw new Error(ServerErrors.UNKNOWN_ROUTE)
    }
  } catch (err) {
    if (!(err instanceof Error)) {
      throw createError({
        statusCode: 500,
        message: ServerErrors.UNKNOWN
      })
    } else if (
      err.message === FSXAApiErrors.NOT_FOUND ||
      err.message === FSXAApiErrors.UNKNOWN_REMOTE
    ) {
      throw createError({
        statusCode: 404,
        message: err.message
      })
    } else if (FSXAApiErrors.NOT_AUTHORIZED === err.message) {
      throw createError({
        statusCode: 401,
        message: err.message
      })
    } else {
      throw createError({
        statusCode: 500,
        message: err.message || ServerErrors.UNKNOWN
      })
    }
  }
})
