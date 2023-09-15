import { it, expect, describe, vi } from 'vitest'
import {
  ComparisonQueryOperatorEnum,
  FSXAProxyApi,
  FSXARemoteApi
} from 'fsxa-api'
import createContentApi from '../../plugins/5.createContentApi'
import {
  fetchTopLevelNavigation,
  getLocaleFromNavigationItem,
  fetchPageById,
  fetchDatasetByRoute,
  fetchNavigationItemFromRoute,
  fetchDatasetById,
  fetchProducts,
  createProxyApi,
  createRemoteApi
} from '../../utils/fsxa'
import navigationData from '../fixtures/navigationDataSeoRoute.json'
import navigationItem from '../fixtures/navigationItem.json'
import datasetsFilter from '../fixtures/datasetsFilter.json'
import { useAppConfig, useRuntimeConfig } from 'tests/testutils/nuxtMocks'

describe('fsxa utils', () => {
  describe('fetchTopLevelNavigation', () => {
    it('call with valid locale => get navigation data, call fsxaApi.fetchNavigation with locale', async () => {
      const fsxaApi = createContentApi()
      fsxaApi.fetchNavigation = vi.fn().mockReturnValue(navigationData)

      expect(await fetchTopLevelNavigation(fsxaApi, 'de_DE')).toStrictEqual(
        navigationData
      )

      expect(fsxaApi.fetchNavigation).toHaveBeenCalledWith({
        locale: 'de_DE'
      })
    })
  })

  describe('getLocaleFromNavigationItem', () => {
    it('call with contentReference => return the locale from the contentReference', () => {
      expect(getLocaleFromNavigationItem(navigationItem)).toBe('en_GB')
    })

    it('call without contentReference => throw an error', () => {
      expect(() => getLocaleFromNavigationItem({} as any)).toThrow()
    })

    it('call with contentReference without locale => throw an error', () => {
      expect(() =>
        getLocaleFromNavigationItem({ contentReference: 'foo' } as any)
      ).toThrow()
    })
  })

  describe('fetchPageById', () => {
    it('call with valid locale and id => call fsxaApi.fetchElement with locale and id, return element', async () => {
      const fsxaApi = createContentApi()

      fsxaApi.fetchElement = vi.fn().mockReturnValue({})

      expect(await fetchPageById(fsxaApi, '123', 'de_DE')).toStrictEqual({})

      expect(fsxaApi.fetchElement).toHaveBeenCalledWith({
        id: '123',
        locale: 'de_DE'
      })
    })
  })

  describe('fetchDatasetByRoute', () => {
    it('call with valid params => call fsxaApi.fetchByFilter with same params, return filtered items', async () => {
      const fsxaApi = createContentApi()

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter)

      expect(
        await fetchDatasetByRoute(fsxaApi, '/some/route', 'de_DE')
      ).toStrictEqual(datasetsFilter.items[0])

      expect(fsxaApi.fetchByFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          locale: 'de_DE',
          filters: expect.any(Array)
        })
      )
    })
  })

  describe('fetchDatasetById', () => {
    it('call with valid params => call fsxaApi.fetchByFilter with same params, return filtered items', async () => {
      const fsxaApi = createContentApi()

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter)

      expect(await fetchDatasetById(fsxaApi, 'id', 'de_DE')).toStrictEqual(
        datasetsFilter.items[0]
      )

      expect(fsxaApi.fetchByFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          locale: 'de_DE',
          filters: [
            {
              operator: ComparisonQueryOperatorEnum.EQUALS,
              value: 'id',
              field: 'identifier'
            }
          ]
        })
      )
    })
  })

  describe('fetchNavigationItemFromRoute', () => {
    it('call with valid data => return the navigation item', async () => {
      const fsxaApi = createContentApi()

      fsxaApi.fetchNavigation = vi.fn().mockReturnValue(navigationData)

      expect(
        await fetchNavigationItemFromRoute(fsxaApi, '/Home/')
      ).toStrictEqual(Object.values(navigationData.idMap)[0])
    })

    it('call with / => return the index navigation item', async () => {
      const fsxaApi = createContentApi()

      fsxaApi.fetchNavigation = vi.fn().mockReturnValue(navigationData)

      expect(await fetchNavigationItemFromRoute(fsxaApi, '/')).toStrictEqual(
        navigationData.idMap[
          navigationData.seoRouteMap[navigationData.pages.index]
        ]
      )
    })

    it('call with missing route => throw', () => {
      const fsxaApi = createContentApi()

      fsxaApi.fetchNavigation = vi.fn().mockReturnValue(navigationData)

      expect(
        fetchNavigationItemFromRoute(fsxaApi, '/doesnotexist/')
      ).rejects.toThrow()
    })
  })

  describe('fetchProducts', () => {
    it('call with valid params => call fsxaApi.fetchByFilter with same params, return filtered items', async () => {
      const fsxaApi = createContentApi()

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter)

      expect(await fetchProducts(fsxaApi, 'de_DE', 'categoryId')).toStrictEqual(
        datasetsFilter.items
      )

      expect(fsxaApi.fetchByFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          locale: 'de_DE',
          filters: [
            {
              field: 'entityType',
              operator: ComparisonQueryOperatorEnum.EQUALS,
              value: 'product'
            },
            {
              field: 'schema',
              operator: ComparisonQueryOperatorEnum.EQUALS,
              value: 'products'
            },
            {
              field: 'formData.tt_categories.value.identifier',
              operator: ComparisonQueryOperatorEnum.EQUALS,
              value: 'categoryId'
            }
          ]
        })
      )
    })
  })
  describe('createContentApi', () => {
    describe('createProxyApi', () => {
      // fails because it's not run on the client, maybe we can mock the response to process.client
      it('call from client without params => return FSXAProxyApi', () => {
        process.client = true
        expect(createProxyApi()).toBeInstanceOf(FSXAProxyApi)
      })
      it('call from server without params => throw error', () => {
        process.client = false
        expect(() => createProxyApi()).toThrow()
      })
    })
    describe('createRemoteApi', () => {
      it('call from server with correct params => return FSXARemoteApi', () => {
        process.client = false
        expect(
          createRemoteApi(useRuntimeConfig(), useAppConfig())
        ).toBeInstanceOf(FSXARemoteApi)
      })
      it('call from client with correct params => throw error', () => {
        process.client = true
        expect(() =>
          createRemoteApi(useRuntimeConfig(), useAppConfig())
        ).toThrow()
      })
    })
  })
})

// fetch dataset by id

// fetch products
