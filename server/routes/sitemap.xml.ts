import { createApi } from '~/utils/fsxa'

export default defineEventHandler(async (event) => {
  const remoteApi = createApi()
  const baseURL = getRequestURL(event).origin
  const navigationData = await remoteApi.fetchNavigation({ locale: 'de_DE' })
  const seoRoutes = Object.keys(navigationData?.seoRouteMap || [])
  const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset>
    ${seoRoutes
      .map((seoRoute) => `<url><loc>${baseURL}${seoRoute}</loc></url>`)
      .join('\n')}
          </urlset>`

  setResponseHeader(event, 'Content-Type', 'text/xml')

  return xmlString
})
