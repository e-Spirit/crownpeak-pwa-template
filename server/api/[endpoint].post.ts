import { FSXAApiErrors, FSXAProxyRoutes } from 'fsxa-api'
import { ServerErrors } from '~/types'
import { createRemoteApi } from '~/utils/fsxa'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const fsxaApi = createRemoteApi(runtimeConfig, appConfig) // throws error if undefined
  const body = await readBody(event)
  const endpoint = event.context['params']?.['endpoint']

  try {
    switch (`/${endpoint}`) {
      case FSXAProxyRoutes.FETCH_ELEMENT_ROUTE:
        return await fsxaApi.fetchElement(body)
      case FSXAProxyRoutes.FETCH_BY_FILTER_ROUTE:
        return await fsxaApi.fetchByFilter(body)
      case FSXAProxyRoutes.FETCH_NAVIGATION_ROUTE:
        return await fsxaApi.fetchNavigation(body)
      case FSXAProxyRoutes.FETCH_PROPERTIES_ROUTE:
        return await fsxaApi.fetchProjectProperties(body)
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
