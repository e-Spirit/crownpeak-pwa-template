import { FSXAApiSingleton } from 'fsxa-api'
import { ServerErrors, FSXAProxyRoutes, FSXAApiErrors } from '~/types'

export default defineEventHandler(async (event) => {
  const remoteApi = FSXAApiSingleton.instance // throws error if undefined
  const body = await readBody(event)
  const endpoint = event.context['params']?.['endpoint']

  // TODO: This is because of a mismatch between the FSXA API and the FSXA Proxy API,
  // should be fixed in a future ticket
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
