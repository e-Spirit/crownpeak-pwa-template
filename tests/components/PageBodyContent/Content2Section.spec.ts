/**
 * @vitest-environment jsdom
 */
import { it, expect, describe, beforeEach } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import Content2Section from '~/components/PageBodyContent/Content2Section.vue'
import { createContent2Section } from '~/tests/testutils/createContent2Section'
import { renderConfig } from '~/tests/testutils/renderConfig' // registers custom components

describe('Content2Section', () => {
  beforeEach(() => {
    cleanup()
  })

  it('render with unknown template => render Unknown component', () => {
    const section = createContent2Section({ sectionType: 'unknown' })
    const { getByTestId } = render(Content2Section, {
      global: renderConfig.global,
      props: { content: section }
    })

    expect(getByTestId('unknown')).toBeTruthy()
  })
})
