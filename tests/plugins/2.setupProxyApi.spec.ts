import { it, expect } from 'vitest'
import setupProxyApi from '../../plugins/2.setupProxyApi'
import runtimeConfig from '../fixtures/runtimeConfig.json'

it('setupProxyApi => provide fsxaApi', () => {
  const {
    provide: { fsxaApi }
  } = setupProxyApi()
  expect(fsxaApi).toEqual(
    expect.objectContaining({
      _baseUrl: runtimeConfig.public.baseURL + '/api'
    })
  )
})
