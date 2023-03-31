/**
 * @vitest-environment jsdom
 */
import { it, expect, describe, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import Footer from '../../../components/AppLayout/Footer.vue'
import { renderConfig } from '../../testutils/renderConfig' // registers custom components
import { useProjectProperties } from '../../../composables/projectProperties'
import { clearMockedState } from '../../testutils/nuxtMocks'
import projectPropertiesFixture from '../../fixtures/projectProperties.json'

describe('footer', () => {
  afterEach(() => {
    cleanup()
    clearMockedState()
  })

  it('render footer => render logo, copyright, legal links', () => {
    const { projectProperties } = useProjectProperties()

    // usually we need to directly modify project properties here, instead of projectProperties.value
    // because the testing library does not support composables
    // @ts-ignore
    projectProperties.data = projectPropertiesFixture.data

    const { getByTestId } = render(Footer, {
      global: renderConfig.global
    })

    const footer = getByTestId('footer')

    const logo = getByTestId('logo')
    const copyright = getByTestId('copyright')
    const legal = getByTestId('legal-links')

    expect(footer).not.toBe(null)
    expect(logo).not.toBe(null)
    expect(copyright).not.toBe(null)
    expect(legal).not.toBe(null)
  })
})
