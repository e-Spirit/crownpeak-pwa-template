import { FSXAProxyRoutes } from 'fsxa-api'
import { ServerErrors } from '~/types'
import { createRemoteApi, isHttpError } from '~/utils/fsxa'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const remoteApi = createRemoteApi(runtimeConfig, appConfig)
  const body = await readBody(event)
  const endpoint = event.context['params']?.['endpoint']

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
    if (err instanceof Error && isHttpError(err)) {
      throw createError({ statusCode: err.statusCode, message: err.message })
    } else if (err instanceof Error) {
      throw createError({
        statusCode: 500,
        message: err.message || ServerErrors.UNKNOWN
      })
    }
  }
})
