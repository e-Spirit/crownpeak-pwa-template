/**
 * @vitest-environment jsdom
 */
import { it, expect, describe, beforeEach } from 'vitest'
import { render, cleanup } from '@testing-library/vue'
import Dataset from '../../../components/PageBodyContent/Dataset.vue'
import { createDataset } from '../../testutils/createDataset'
import { renderConfig } from '../../testutils/renderConfig' // registers custom components

describe('Dataset', () => {
  beforeEach(() => {
    cleanup()
  })

  it('render with unknown template => render Unknown component', () => {
    const section = createDataset({ template: 'unknown' })
    const { getByTestId } = render(Dataset, {
      global: renderConfig.global,
      props: { content: section }
    })

    expect(getByTestId('unknown')).toBeTruthy()
  })
})
