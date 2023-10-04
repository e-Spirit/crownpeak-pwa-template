import {
  FSXAApi,
  NormalizedProjectPropertyResponse,
  ProjectProperties
} from 'fsxa-api'
import { isHttpError } from '~/utils/fsxa'

export function handleFetchProjectPropertiesError(error: unknown): void {
  if (error instanceof Error && isHttpError(error)) {
    throw createError({
      statusCode: error.statusCode,
      message: error.message,
      fatal: true
    })
  }
  throw createError({
    statusCode: 500,
    message: 'Internal server error',
    fatal: true
  })
}
export function useProjectProperties() {
  const projectProperties = useState<ProjectProperties | null>(
    'projectProperties'
  )
  const cachedProjectProperties = useState<{
    [locale: string]: ProjectProperties
  }>('cachedProjectProperties', () => ({}))
  const { $createContentApi } = useNuxtApp()
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
    if (cachedProjectProperties.value[locale]) {
      return cachedProjectProperties.value[locale]
    }
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

      return projectProperties
    } catch (error) {
      handleFetchProjectPropertiesError(error)
    }
    return null
  }
  return {
    projectProperties,
    cachedProjectProperties,
    setProjectProperties,
    fetchProjectProperties
  }
}
