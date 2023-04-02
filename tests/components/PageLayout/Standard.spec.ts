/**
 * @vitest-environment jsdom
 */
import { it, describe, beforeEach, expect } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import Standard from '../../../components/PageLayout/Standard.vue'
import { createPage } from '../../testutils/createPage'
import { renderConfig } from '../../testutils/renderConfig'
import { createPageBody } from '../../testutils/createPageBody'

describe('StandardPageLayout', () => {
  beforeEach(() => {
    cleanup()
  })
  it('render with pageBody => render pageBody and Header', () => {
    const page = createPage()
    const pageBody = createPageBody()
    page.children.push(pageBody)
    const { getByTestId } = render(Standard, {
      global: renderConfig.global,
      props: { page }
    })

    expect(getByTestId('headerSection')).toBeTruthy()
    expect(getByTestId('pageBody')).toBeTruthy()
  })
})
