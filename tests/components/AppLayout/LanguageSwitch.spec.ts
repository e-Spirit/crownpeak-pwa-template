/**
 * @vitest-environment jsdom
 */
import { it, expect, describe, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import LanguageSwitch from '../../../components/AppLayout/LanguageSwitch.vue'
import { renderConfig } from '../../testutils/renderConfig' // registers custom components
import { clearMockedState } from '../../testutils/nuxtMocks'
import { useLocale } from '../../../composables/locale'

describe('header', () => {
  afterEach(() => {
    cleanup()
    clearMockedState()
  })

  it('render language switch => render languages from locale config', () => {
    const { config } = useLocale()

    // the testing library does not support composables
    config.allLocales = config.value.allLocales

    const { getByTestId } = render(LanguageSwitch, {
      global: renderConfig.global
    })

    const languageSwitch = getByTestId('languageSwitch')
    const languagesDropdown = getByTestId('languagesDropdown')

    const languagesUL = languagesDropdown.children[0]

    expect(languageSwitch).not.toBe(null)
    expect(languagesUL.children.length).toBe(config.allLocales.length)

    for (let i = 0; i < languagesUL.children.length; i++) {
      const child = languagesUL.children[i]
      expect(child.innerHTML).toContain(config.allLocales[i].name)
    }
  })
})
