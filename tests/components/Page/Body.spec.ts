/**
 * @vitest-environment jsdom
 */
import { it, expect, describe, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import PageBody from '../../../components/Page/Body.vue'
import { createPageBody } from '../../testutils/createPageBody'
import { createSection } from '../../testutils/createSection'
import { createDataset } from '../../testutils/createDataset'
import { createContent2Section } from '../../testutils/createContent2Section'
import { renderConfig } from '../../testutils/renderConfig' // registers custom components

describe('pageBody', () => {
  afterEach(() => {
    cleanup()
  })

  it('render => pageBody children get rendered', () => {
    const section = createSection()
    const dataset = createDataset()
    const content2Section = createContent2Section()
    const unknown = createSection()
    unknown.type = 'unknown' as any

    const pageBody = createPageBody({
      children: [section, dataset, content2Section, unknown]
    })

    const { getAllByTestId } = render(PageBody, {
      global: renderConfig.global,
      props: { pageBody }
    })

    const pageBodyChildren = getAllByTestId('pageBodyChild')

    expect(pageBodyChildren.length).toBe(4)

    expect(
      pageBodyChildren[0]?.querySelector('[data-testid=section]')
    ).toBeTruthy()
    // section maps to section component
    expect(
      pageBodyChildren[1]?.querySelector('[data-testid=dataset]')
    ).toBeTruthy() // dataset maps to dataset component
    expect(
      pageBodyChildren[2]?.querySelector('[data-testid=section]')
    ).toBeTruthy() // content2section maps to section component

    expect(
      pageBodyChildren[3]?.querySelector('[data-testid=unknown]')
    ).toBeTruthy() // unknwon maps to unknwon component
  })
})
