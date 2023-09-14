// This middleware is getting called whenever the route changes. (Internal links and deeplinks)

import { FSXAApiErrors } from '~~/types'

// This can happen on both the client and the server.
export default defineNuxtRouteMiddleware(async (to) => {
  const { activeLocale } = useLocale()
  const { $logger } = useNuxtApp()

  const route = decodeURIComponent(to.path)
  const {
    determineNavigationStateFromRoute,
    activeNavigationItem,
    getIndexRoute
  } = useNavigationData()

  // "/" does not exist in the navigation tree, so we first need to figure out the mapped route and then navigate to it.
  if (route === '/') {
    $logger.info('Trying to redirect / to home route...')
    return navigateTo({
      path: await getIndexRoute(),
      hash: to.hash,
      query: to.query
    })
  }

  // If a the route is changed by the user (e.g. the first time the page is loaded or by redirecting from a different web page), the activeNavigationItem and activeLocale are undefined.
  // In this case we need to get the navigation state from the route.
  const isDeeplink =
    activeLocale.value === undefined || activeNavigationItem.value === undefined

  // If you use the browser forward and back buttons, the route will change, but the activeNavigationItem and locale will still be the old ones.
  // If it is, we handle it like a normal deeplink. This has the advantage that we do not have to maintain a history ourselves.
  const isBrowserBackOrForward = activeNavigationItem.value?.seoRoute !== route

  try {
    if (isDeeplink || isBrowserBackOrForward) {
      // This will use the navigation service to first get the best matching navigation item from the route, and then extract the locale from it
      await determineNavigationStateFromRoute(route)
    }
  } catch (_error: unknown) {
    if (_error instanceof Error && _error.message === FSXAApiErrors.NOT_FOUND) {
      $logger.error('Server error or page not found.')
      throw createError({
        statusCode: 404,
        message: 'Page not found',
        fatal: true
      })
    }

    $logger.error('Internal server error.')
    throw createError({
      statusCode: 500,
      message: 'Internal server error',
      fatal: true
    })
  }

  // If the route is not a deeplink, we do not need to do anything, since the activeNavigationItem and activeLocale are already set by the component.

  return true
})
