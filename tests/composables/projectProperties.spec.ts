import { it, expect, describe, beforeEach } from 'vitest'
import { createProjectProperties } from '~/tests/testutils/createProjectProperties'
import { clearMockedState } from '~/tests/testutils/nuxtMocks'
import projectPropertiesFixture from '~/tests/fixtures/projectProperties.json'
import { useProjectProperties } from '~/composables/projectProperties'

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

  // describe('fetchProjectProperties', () => {
  //   it('project properties not in cache => fetch project properties from fsxa api', async () => {
  //     const { fetchProjectProperties } = useProjectProperties()
  //     const returnVal = await fetchProjectProperties('en_GB')
  //     expect(returnVal).toBe(projectPropertiesFixture)
  //   })
  //   it('project properties in cache => return cached value', async () => {
  //     const { fetchProjectProperties, cachedProjectProperties } =
  //       useProjectProperties()
  //     const mockedCachedProjectProperties = createProjectProperties()
  //     cachedProjectProperties.value['en_GB'] = mockedCachedProjectProperties
  //     const returnVal = await fetchProjectProperties('en_GB')
  //     expect(returnVal).toBe(mockedCachedProjectProperties)
  //   })
  // })
})
