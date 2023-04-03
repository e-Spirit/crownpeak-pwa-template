/**
 * @vitest-environment jsdom
 */
import { it, describe, beforeEach, expect } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import Home from '~/components/PageLayout/Home.vue'
import { createPage } from '~/tests/testutils/createPage'
import { createPageBody } from '~/tests/testutils/createPageBody'
import { renderConfig } from '~/tests/testutils/renderConfig'

describe('HomePageLayout', () => {
  beforeEach(() => {
    cleanup()
  })
  it('render with pageBody => render pageBody and Slider', () => {
    const page = createPage()
    const pageBody = createPageBody()
    page.children.push(pageBody)
    page.data['pt_slider'] = []

    const { getByTestId } = render(Home, {
      global: renderConfig.global,
      props: { page }
    })

    expect(getByTestId('sliderSection')).toBeTruthy()
    expect(getByTestId('pageBody')).toBeTruthy()
  })
})
