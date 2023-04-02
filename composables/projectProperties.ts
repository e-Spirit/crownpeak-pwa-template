import { ProjectProperties } from 'fsxa-api'

export function useProjectProperties() {
  const projectProperties = useState<ProjectProperties | null>(
    'projectProperties'
  )
  const cachedProjectProperties = useState<{
    [locale: string]: ProjectProperties
  }>('cachedProjectProperties', () => ({}))

  const { $fsxaApi } = useNuxtApp()

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
    try {
      return (
        cachedProjectProperties.value[locale] ||
        (await $fsxaApi.fetchProjectProperties({ locale }))
      )
    } catch (error) {
      return null
    }
  }
  return {
    projectProperties,
    cachedProjectProperties,
    setProjectProperties,
    fetchProjectProperties
  }
}
