import { getAvailableLocales } from 'fsxa-api'
import { getLanguageNamesFromLocales } from '../utils/misc'

type LocaleConfig = {
  defaultLocale: string
}

export type LocaleType = {
  // it can be null in case it is not used ISO format
  name: string | null
  identifier: string
}

const defaultLocaleConfig: LocaleConfig = {
  defaultLocale: 'de_DE'
}

export function useLocale() {
  const runtimeConfig = useRuntimeConfig()
  const {
    public: { defaultLocale: runtimeConfigDefaultLocale }
  } = runtimeConfig
  const { defaultLocale: appConfigDefaultLocale } = useAppConfig()

  defaultLocaleConfig.defaultLocale =
    runtimeConfigDefaultLocale ||
    appConfigDefaultLocale ||
    defaultLocaleConfig.defaultLocale

  const config = useState<LocaleConfig>(
    'localeConfig',
    () => defaultLocaleConfig
  )
  const activeLocale = useState<string | undefined>('activeLocale')
  const availableLocales = useState<LocaleType[]>('availableLocales')

  /**
   * Sets the active locale. Gets called when:
   * 1. the user changes the locale or
   * 2. the user opens a deeplink and we extract the locale from the navigation data
   * @param locale
   */
  function setActiveLocale(locale: string) {
    activeLocale.value = locale
  }

  function setAvailableLocales(identifiers: string[]) {
    availableLocales.value = getLanguageNamesFromLocales(identifiers)
  }

  async function fetchAvailableLocales() {
    if (process.server) {
      const availableLocales = await getAvailableLocales({
        navigationServiceURL: runtimeConfig.private.navigationService,
        projectId: runtimeConfig.private.projectId,
        contentMode: runtimeConfig.public.mode
      })
      setAvailableLocales(availableLocales)
    }
  }

  return {
    config,
    setActiveLocale,
    activeLocale,
    availableLocales,
    setAvailableLocales,
    fetchAvailableLocales
  }
}
