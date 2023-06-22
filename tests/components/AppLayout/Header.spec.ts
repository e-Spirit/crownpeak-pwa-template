/**
 * @vitest-environment jsdom
 */
import { it, expect, describe, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import Header from '~/components/AppLayout/Header.vue'
import { renderConfig } from '~/tests/testutils/renderConfig' // registers custom components
import { useProjectProperties } from '~/composables/projectProperties'
import { clearMockedState } from '~/tests/testutils/nuxtMocks'
import projectPropertiesFixture from '~/tests/fixtures/projectProperties.json'

describe('header', () => {
  afterEach(() => {
    cleanup()
    clearMockedState()
  })

  it('render header => render logo, navigation, languageSwitch', () => {
    const { projectProperties } = useProjectProperties()

    // usually we need to directly modify project properties here, instead of projectProperties.value
    // because the testing library does not support composables
    // @ts-ignore
    projectProperties.data = projectPropertiesFixture.data

    const { getByTestId } = render(Header, {
      global: renderConfig.global
    })

    const header = getByTestId('layoutHeader')
    const logo = getByTestId('logo')
    const navigation = getByTestId('navigation')
    const languageSwitch = getByTestId('languageSwitch')

    expect(header).not.toBe(null)
    expect(logo).not.toBe(null)
    expect(navigation).not.toBe(null)
    expect(languageSwitch).not.toBe(null)
  })
})
