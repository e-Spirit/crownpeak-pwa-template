import { LocaleType } from '../composables/locale'

export function getLanguageNamesFromLocales(identifiers: string[]) {
  const locales: LocaleType[] = []
  identifiers.forEach((identifier) => {
    // Split the identifier into language and region
    // e.g. de_DE => [de, DE]
    const [isoCode] = identifier.split('_')
    if (isoCode) {
      const intl = new Intl.DisplayNames([isoCode], {
        type: 'language'
      })
      const languageName = intl.of(isoCode) ?? null
      locales.push({
        name: languageName,
        identifier
      })
    }
  })

  return locales
}
