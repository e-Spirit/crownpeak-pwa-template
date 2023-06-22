import {
  FSXAProxyApi,
  NavigationItem,
  ComparisonQueryOperatorEnum,
  LogicalQueryOperatorEnum,
  Dataset,
  Page,
  QueryBuilderQuery,
  CaaSApi_Dataset as CaasDataset,
  ProjectProperties
} from 'fsxa-api'
import { LegalLink } from '~~/types'
/**
 * Fetch dataset through the FSXA Api by route
 * @param fsxaApi Instance of the FSXA Api
 * @param route Route
 * @param locale Locale
 * @throws Error if datasets cannot be fetched
 * @returns Dataset or null
 */
export const fetchDatasetByRoute = async (
  fsxaApi: FSXAProxyApi,
  route: string,
  locale: string
) => {
  const data = await fsxaApi.fetchByFilter({
    locale,
    pagesize: 1,
    filters: [
      {
        operator: LogicalQueryOperatorEnum.OR,
        filters: [
          {
            field: 'route',
            operator: ComparisonQueryOperatorEnum.EQUALS,
            value: route
          },
          {
            field: 'routes.route',
            operator: ComparisonQueryOperatorEnum.EQUALS,
            value: route
          }
        ]
      },
      {
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: 'Dataset',
        field: 'fsType'
      }
    ]
  })

  const bestMatch = data.items[0]

  return bestMatch as Dataset | null
}

/**
 * Fetch dataset through the FSXA Api by id
 * @param fsxaApi Instance of the FSXA Api
 * @param id Dataset identifier
 * @param locale Locale
 * @throws Error if datasets cannot be fetched
 * @returns Dataset or null
 */
export const fetchDatasetById = async (
  fsxaApi: FSXAProxyApi,
  id: string,
  locale: string
) => {
  const dataset = await fsxaApi.fetchByFilter({
    filters: [
      {
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: id,
        field: 'identifier'
      }
    ],
    locale
  })

  return dataset.items[0] as Dataset | null
}

/**
 * Fetch page through the FSXA Api by id
 * @param fsxaApi Instance of the FSXA Api
 * @param id Page identifier
 * @param locale Locale
 * @throws Error if element cannot be fetched
 * @returns Page or null
 */
export const fetchPageById = async (
  fsxaApi: FSXAProxyApi,
  id: string,
  locale: string
) => {
  const page = await fsxaApi.fetchElement<Page>({
    id,
    locale
  })

  return page ?? null
}

/**
 * Get the corresponding navigation item to the provided route from the navigation service.
 * This function is used in middleware to always provide a navigation item for a given route.
 * @param fsxaApi Instance of the FSXA Api
 * @param route Route
 * @throws Error if navigation item cannot be fetched or if the navigation data is missing route information
 * @returns Navigation Item
 */
export const fetchNavigationItemFromRoute = async (
  fsxaApi: FSXAProxyApi,
  route: string
) => {
  // This could also be cached
  const data = await fsxaApi.fetchNavigation({
    initialPath: route,
    locale: ''
  })
  if (!data) throw new Error('No navigation data found')

  // If any of the following lines throw an error, the Navigation Service is probably broken?
  const seoRouteId = data.seoRouteMap[route === '/' ? data.pages.index : route]
  if (!seoRouteId) throw new Error('No matching route found')

  const item = data.idMap[seoRouteId]
  if (!item) throw new Error('No navigation item found')

  return item
}

/**
 * Get the locale from navigation item. This function is used in middleware to always provide the locale of a given route.
 * @param navigationItem Navigation Item
 * @throws Error if locale cannot be extracted from navigation item
 * @returns Locale
 */
export const getLocaleFromNavigationItem = (navigationItem: NavigationItem) => {
  const splitted = navigationItem?.contentReference?.split('.')
  if (!splitted || splitted.length < 2)
    throw new Error('No valid contentReference found')

  const locale = splitted?.pop()
  if (!locale) throw new Error('No locale found')

  return locale
}

/**
 * Fetch navigation data from navigation service
 * @param fsxaApi Instance of the FSXA Api
 * @param locale Locale
 * @returns Navigation Data
 */
export const fetchTopLevelNavigation = (
  fsxaApi: FSXAProxyApi,
  locale: string
) => {
  return fsxaApi.fetchNavigation({
    locale
  })
}

/**
 * Fetch products data from CAAS
 * @param fsxaApi Instance of the FSXA Api
 * @param locale Locale
 * @param category (Optional) Product category identifier
 * @throws Error if products cannot be fetched
 * @returns Products
 */
export const fetchProducts = async (
  fsxaApi: FSXAProxyApi,
  locale: string,
  category?: string
) => {
  const filters: QueryBuilderQuery[] = [
    {
      field: 'entityType',
      operator: ComparisonQueryOperatorEnum.EQUALS,
      value: 'product'
    },
    {
      field: 'schema',
      operator: ComparisonQueryOperatorEnum.EQUALS,
      value: 'products'
    }
  ]

  if (category) {
    filters.push({
      field: 'formData.tt_categories.value.identifier',
      operator: ComparisonQueryOperatorEnum.EQUALS,
      value: category
    })
  }

  const { items } = await fsxaApi.fetchByFilter({
    filters,
    locale
  })

  return items as Dataset[]
}

export const fetchPageRoute = async (
  fsxaApi: FSXAProxyApi,
  locale: string,
  id: string
) => {
  const response = await fsxaApi.fetchByFilter({
    filters: [
      {
        field: 'identifier',
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: id
      }
    ],
    locale,
    additionalParams: {
      keys: [{ type: 1, route: 1, 'routes.route': 1 }]
    }
  })

  const item = response?.items?.[0] as Partial<
    Pick<CaasDataset, 'routes' | 'route'>
  >

  const route = item?.route ?? item?.routes?.[0]?.route ?? null

  return route
}

export const getLegalLinks = (
  projectProperties: ProjectProperties | null
): LegalLink[] =>
  projectProperties?.data['ps_footer'].gc_linklist.map(
    (link: { data: { lt_text: string } }) => ({
      name: link.data.lt_text,
      route: '/' + link.data.lt_text.replaceAll(' ', '-')
    })
  )
