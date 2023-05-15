type LocaleType = {
  // it can be null in case it is not used ISO format
  name: string | null
  identifier: string
}

type LocaleConfig = {
  defaultLocale: string
}

function getLocalesWithRegion(identifiers: string[]) {
  const locales: LocaleType[] = []
  identifiers.forEach((identifier) => {
    // Split the identifier into language and region
    // e.g. de_DE => [de, DE]
    const [language, region] = identifier.split('_')
    if (language && region) {
      const regionName = new Intl.DisplayNames([language], { type: 'region' })
      locales.push({
        name: regionName.of(region) ?? null,
        identifier
      })
    }
  })

  return locales
}

const defaultLocaleConfig: LocaleConfig = {
  defaultLocale: 'de_DE'
}

export function useLocale() {
  const {
    public: { defaultLocale: runtimeConfigDefaultLocale }
  } = useRuntimeConfig()
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
    availableLocales.value = getLocalesWithRegion(identifiers)
  }

  return {
    config,
    setActiveLocale,
    activeLocale,
    availableLocales,
    setAvailableLocales
  }
}
