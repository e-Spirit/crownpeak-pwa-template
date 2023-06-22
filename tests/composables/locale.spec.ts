import { it, expect, describe } from 'vitest'
import { useLocale } from '../../composables/locale'

describe('useLocale', () => {
  it('useLocale => provide default config', () => {
    const { config, activeLocale } = useLocale()

    expect(config.value).toEqual(
      expect.objectContaining({
        defaultLocale: 'de_DE'
      })
    )
    expect(activeLocale.value).toBeUndefined()
  })

  it('setActiveLocale => set activeLocale in config', () => {
    const { config, setActiveLocale, activeLocale } = useLocale()

    setActiveLocale('en_GB')

    expect(config.value).toEqual(
      expect.objectContaining({
        defaultLocale: 'de_DE'
      })
    )
    expect(activeLocale.value).toBe('en_GB')
  })

  it('setAvailableLocales => set available locales', () => {
    const { availableLocales, setAvailableLocales } = useLocale()

    setAvailableLocales(['en_GB', 'de_DE'])

    expect(availableLocales.value).toEqual(
      expect.arrayContaining([
        { name: 'Deutsch', identifier: 'de_DE' },
        { name: 'English', identifier: 'en_GB' }
      ])
    )
  })

  it('setAvailableLocales => set available locales with hyphen ISO Format', () => {
    const { availableLocales, setAvailableLocales } = useLocale()

    setAvailableLocales(['en-GB', 'de-DE'])

    expect(availableLocales.value).toEqual(
      expect.arrayContaining([
        { name: 'Deutsch (Deutschland)', identifier: 'de-DE' },
        { name: 'British English', identifier: 'en-GB' }
      ])
    )
  })

  it('setAvailableLocales => set available locales with no supported format', () => {
    const { availableLocales, setAvailableLocales } = useLocale()

    setAvailableLocales(['testone', 'testtwo'])

    expect(availableLocales.value).toEqual(
      expect.arrayContaining([
        { name: 'testone', identifier: 'testone' },
        { name: 'testtwo', identifier: 'testtwo' }
      ])
    )
  })
})
