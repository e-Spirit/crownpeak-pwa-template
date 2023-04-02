type LocaleConfig = {
  defaultLocale: string
  allLocales: { name: string; identifier: string }[]
}

// TODO: Implement this function however you want
// You might want to use the CaaS to get all available locales
const getAllLocales = () => [
  { name: 'Deutsch', identifier: 'de_DE' },
  { name: 'English', identifier: 'en_GB' }
]

const defaultConfig: LocaleConfig = {
  defaultLocale: 'de_DE',
  allLocales: getAllLocales()
}

export function useLocale() {
  const config = useState<LocaleConfig>('localeConfig', () => defaultConfig)
  const activeLocale = useState<string | undefined>('activeLocale')
  /**
   * Sets the active locale. Gets called when:
   * 1. the user changes the locale or
   * 2. the user opens a deeplink and we extract the locale from the navigation data
   * @param locale
   */
  function setActiveLocale(locale: string) {
    activeLocale.value = locale
  }

  return {
    config,
    setActiveLocale,
    activeLocale
  }
}
