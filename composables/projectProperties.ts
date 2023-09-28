import {
  FSXAApi,
  NormalizedProjectPropertyResponse,
  ProjectProperties
} from 'fsxa-api'

export function useProjectProperties() {
  // eslint-disable-next-line no-console
  console.time('useProjectPropertiesAll')
  // eslint-disable-next-line no-console
  console.time('useStatefetchingProjectProperties')
  const projectProperties = useState<ProjectProperties | null>(
    'projectProperties'
  )
  // eslint-disable-next-line no-console
  console.timeEnd('useStatefetchingProjectProperties')
  const cachedProjectProperties = useState<{
    [locale: string]: ProjectProperties
  }>('cachedProjectProperties', () => ({}))

  // eslint-disable-next-line no-console
  console.time('useNuxtAppfetchingProjectProperties')
  const { $createContentApi } = useNuxtApp()
  // eslint-disable-next-line no-console
  console.timeEnd('useNuxtAppfetchingProjectProperties')
  const fsxaApi: FSXAApi = $createContentApi()

  /**
   * Sets projectProperties composable and stores it in under its locale in cachedProjectProperties
   * @param data ProjectProperties
   * @param locale Locale identifier
   */
  function setProjectProperties(data: ProjectProperties, locale: string) {
    projectProperties.value = data
    if (!cachedProjectProperties.value[locale])
      cachedProjectProperties.value[locale] = data
  }

  /**
   * Get's project properties from cache if it exists, otherwise fetches it from the FSXA Api
   * @param locale Locale identifier
   * @returns project properties or null
   */
  async function fetchProjectProperties(locale: string) {
    // eslint-disable-next-line no-console
    console.time('fetchProjectPropsComposable')
    // if (cachedProjectProperties.value[locale]) {
    //   // eslint-disable-next-line no-console
    //   console.log('cached result!')
    //   // eslint-disable-next-line no-console
    //   console.timeEnd('fetchProjectPropsComposable')
    //   return cachedProjectProperties.value[locale]
    // }
    const isNormalizedProjectPropertyResponse = (
      projectPropertiesResponse:
        | ProjectProperties
        | NormalizedProjectPropertyResponse
        | null
    ) => {
      return (
        projectPropertiesResponse &&
        Object.hasOwn(projectPropertiesResponse as Object, 'projectProperty')
      )
    }
    try {
      const projectPropertiesResponse = await fsxaApi.fetchProjectProperties({
        locale
      })
      let projectProperties = null
      if (isNormalizedProjectPropertyResponse(projectPropertiesResponse)) {
        projectProperties = (
          projectPropertiesResponse as NormalizedProjectPropertyResponse
        ).projectProperties
      }
      projectProperties = projectPropertiesResponse as ProjectProperties
      // eslint-disable-next-line no-console
      console.log(`regular fetch! isClient: ${process.client}`)
      // eslint-disable-next-line no-console
      console.timeEnd('fetchProjectPropsComposable')
      return projectProperties
    } catch (error) {
      // eslint-disable-next-line no-console
      console.timeEnd('fetchProjectPropsComposable')
      return null
    }
  }
  // eslint-disable-next-line no-console
  console.timeEnd('useProjectPropertiesAll')
  return {
    projectProperties,
    cachedProjectProperties,
    setProjectProperties,
    fetchProjectProperties
  }
}
