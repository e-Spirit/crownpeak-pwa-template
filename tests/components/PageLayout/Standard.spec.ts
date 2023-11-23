/**
 * @vitest-environment jsdom
 */
import { it, describe, beforeEach, expect } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import Standard from '~/components/PageLayout/Standard.vue'
import { createPage } from '~/tests/testutils/createPage'
import { renderConfig } from '~/tests/testutils/renderConfig'
import { createPageBody } from '~/tests/testutils/createPageBody'

describe('StandardPageLayout', () => {
  beforeEach(() => {
    cleanup()
  })
  it('render with pageBody => render pageBody and Header', () => {
    const page = createPage()
    const pageBody = createPageBody({ name: 'top' })
    page.children.push(pageBody)
    const { getByTestId } = render(Standard, {
      global: renderConfig.global,
      props: { page }
    })

    expect(getByTestId('headerSection')).toBeTruthy()
    expect(getByTestId('pageBody-top')).toBeTruthy()
  })
})
