import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { HttpError } from 'fsxa-api'
import { createProjectProperties } from '~/tests/testutils/createProjectProperties'
import { clearMockedState } from '~/tests/testutils/nuxtMocks'
import projectPropertiesFixture from '~/tests/fixtures/projectProperties.json'
import {
  useProjectProperties,
  handleFetchProjectPropertiesError
} from '~/composables/projectProperties'

describe('useProjectProperties', () => {
  beforeEach(() => {
    clearMockedState()
  })

  it('useProjectProperties => provide undefined default projectProperties', () => {
    const { projectProperties } = useProjectProperties()
    expect(projectProperties.value).toBeUndefined()
  })

  describe('setProjectProperties', () => {
    it('project properties not in cache => set project properties, add to cache', () => {
      const {
        projectProperties,
        setProjectProperties,
        cachedProjectProperties
      } = useProjectProperties()

      const locale = 'en_GB'

      expect(projectProperties.value).toBeUndefined()
      expect(cachedProjectProperties.value[locale]).toBeUndefined()

      const mockedProjectProperties = createProjectProperties()
      setProjectProperties(mockedProjectProperties, locale)

      expect(projectProperties.value).toBe(mockedProjectProperties)
      expect(cachedProjectProperties.value[locale]).toBe(
        mockedProjectProperties
      )
    })

    it("project properties cached => set project properties, don't add to cache", () => {
      const {
        projectProperties,
        setProjectProperties,
        cachedProjectProperties
      } = useProjectProperties()

      const locale = 'en_GB'
      const mockedCachedProjectProperties = createProjectProperties()
      cachedProjectProperties.value[locale] = mockedCachedProjectProperties

      expect(projectProperties.value).toBeUndefined()

      const mockedProjectProperties = createProjectProperties()
      setProjectProperties(mockedProjectProperties, locale)

      expect(projectProperties.value).toBe(mockedProjectProperties)
      expect(cachedProjectProperties.value[locale]).toBe(
        mockedCachedProjectProperties
      )
    })
  })

  describe('fetchProjectProperties', () => {
    it('project properties not in cache => fetch project properties from fsxa api', async () => {
      const { fetchProjectProperties } = useProjectProperties()
      const returnVal = await fetchProjectProperties('en_GB')
      expect(returnVal).toBe(projectPropertiesFixture)
    })
    it('project properties in cache => return cached value', async () => {
      const { fetchProjectProperties, cachedProjectProperties } =
        useProjectProperties()
      const mockedCachedProjectProperties = createProjectProperties()
      cachedProjectProperties.value['en_GB'] = mockedCachedProjectProperties
      const returnVal = await fetchProjectProperties('en_GB')
      expect(returnVal).toBe(mockedCachedProjectProperties)
    })
    describe('error handling', () => {
      afterEach(() => {
        vi.restoreAllMocks()
      })
      it('throws', () => {
        expect(() => handleFetchProjectPropertiesError('always')).toThrow()
      })
      it('throws an error 500 internal server error if it catches a generic error of type Error', () => {
        try {
          handleFetchProjectPropertiesError(new Error('Generic error'))
        } catch (error: any) {
          expect(error.message).toBe('Internal server error')
          expect(error.statusCode).toBe(500)
        }
      })
      it('forwards the error if it catches an error of type HttpError', () => {
        try {
          handleFetchProjectPropertiesError(new HttpError('Not found', 404))
        } catch (error: any) {
          expect(error.message).toBe('Not found')
          expect(error.statusCode).toBe(404)
        }
      })
    })
  })
})
