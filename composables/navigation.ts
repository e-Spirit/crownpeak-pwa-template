import { NavigationData, NavigationItem } from 'fsxa-api'

export function useNavigationData() {
  const navigationData = useState<NavigationData | null>('navigationData')
  const cachedNavigationData = useState<{
    [locale: string]: NavigationData
  }>('cachedNavigationData', () => ({}))
  const activeNavigationItem = useState<NavigationItem | undefined>(
    'activeNavigationItem'
  )
  const { config: localeConfig, activeLocale, setActiveLocale } = useLocale()
  const { $createContentApi } = useNuxtApp()
  const fsxaApi = $createContentApi()

  /**
   * Get's navigation data from cache if it exists, otherwise fetches it from the FSXA Api
   * @param locale Locale identifier
   * @returns Navigation data or null
   */
  async function fetchNavigationData(locale: string) {
    return (
      cachedNavigationData.value[locale] ||
      (await fsxaApi.fetchNavigation({ locale }))
    )
  }

  /**
   * Sets navigationData composable and stores it in under its locale in cachedNavigationData
   * @param data Navigation data
   */
  function setNavigationData(data: NavigationData) {
    navigationData.value = data
    const locale = data.meta.identifier.languageId
    if (!cachedNavigationData.value[locale])
      cachedNavigationData.value[locale] = data
  }

  /**
   * Find navigation item in navigation data by route
   * @param route
   * @returns Navigation item or null
   */
  function findNavigationItemByRoute(route: string) {
    if (!navigationData.value) return
    const navItemId = navigationData.value.seoRouteMap[route]
    return navItemId ? navigationData.value.idMap[navItemId] : null
  }

  /**
   * Find navigation item in navigation data by id
   * @param id
   * @returns Navigation item or null
   */
  function findNavigationItemById(id: string) {
    return navigationData.value?.idMap[id] ?? null
  }

  /**
   * Set activeLocale and activeNavigationItem based on the route
   * @param route
   */
  async function determineNavigationStateFromRoute(route: string) {
    const item =
      findNavigationItemByRoute(route) ||
      (await fetchNavigationItemFromRoute(fsxaApi, route))
    const locale = getLocaleFromNavigationItem(item)
    // eslint-disable-next-line no-console
    console.log(`I determined locale: ${locale}`)
    setActiveLocale(locale)
    activeNavigationItem.value = item
  }

  /**
   * Determins the route for '/'
   * @returns index route
   */
  async function getIndexRoute() {
    if (!navigationData.value) {
      navigationData.value = await fetchTopLevelNavigation(
        fsxaApi,
        activeLocale.value ?? localeConfig.value.defaultLocale
      )
    }
    return navigationData.value?.pages?.index
  }

  /**
   * Set the active navigation item
   * @param item Navigation item
   */
  function setActiveNavigationItem(item: NavigationItem) {
    activeNavigationItem.value = item
  }

  return {
    fetchNavigationData,
    setNavigationData,
    findNavigationItemByRoute,
    findNavigationItemById,
    determineNavigationStateFromRoute,
    getIndexRoute,
    setActiveNavigationItem,
    activeNavigationItem,
    navigationData,
    cachedNavigationData
  }
}
