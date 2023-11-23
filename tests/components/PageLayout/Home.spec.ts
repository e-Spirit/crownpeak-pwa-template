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
  it('render with pageBody => render 2 pageBodies', () => {
    const page = createPage()
    const pageBodyTop = createPageBody({ name: 'top' })
    const pageBodyContent = createPageBody({ name: 'content' })
    page.children.push(pageBodyTop)
    page.children.push(pageBodyContent)

    const { getByTestId } = render(Home, {
      global: renderConfig.global,
      props: { page }
    })

    expect(getByTestId('pageBody-top')).toBeTruthy()
    expect(getByTestId('pageBody-content')).toBeTruthy()
  })
})
