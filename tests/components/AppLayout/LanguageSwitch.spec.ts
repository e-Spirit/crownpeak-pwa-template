/**
 * @vitest-environment jsdom
 */
import { it, expect, describe, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import LanguageSwitch from '~/components/AppLayout/LanguageSwitch.vue'
import { renderConfig } from '~/tests/testutils/renderConfig' // registers custom components
import { clearMockedState } from '~/tests/testutils/nuxtMocks'
import { useLocale } from '~/composables/locale'

describe('header', () => {
  afterEach(() => {
    cleanup()
    clearMockedState()
  })

  it('render language switch => render languages from locale config', () => {
    const { availableLocales, setAvailableLocales } = useLocale()

    // set available locales
    setAvailableLocales(['en_GB', 'de_DE'])

    const { getByTestId } = render(LanguageSwitch, {
      global: renderConfig.global
    })

    const allLocales = availableLocales.value

    const languageSwitch = getByTestId('languageSwitch')
    const languagesDropdown = getByTestId('languagesDropdown')

    const languagesUL = languagesDropdown.children[0]

    expect(languageSwitch).not.toBe(null)
    expect(languagesUL?.children.length).toBe(allLocales.length)

    for (let i = 0; i < languagesUL!.children.length; i++) {
      const child = languagesUL?.children[i]
      expect(child?.innerHTML).toContain(allLocales[i].name)
    }
  })
})
