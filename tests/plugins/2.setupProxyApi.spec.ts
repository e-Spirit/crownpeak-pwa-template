import { it, expect } from 'vitest'
import setupProxyApi from '~/plugins/2.setupProxyApi'

it('setupProxyApi => provide fsxaApi', () => {
  const {
    provide: { fsxaApi }
  } = setupProxyApi()
  expect(fsxaApi).toEqual(
    expect.objectContaining({
      _baseUrl: 'http://0.0.0.0:3000/api'
    })
  )
})
