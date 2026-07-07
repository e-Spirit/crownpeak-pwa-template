import { it, describe, vi, expect, beforeEach, afterEach } from 'vitest'
import { useState } from '../testutils/nuxtMocks'
import {
  onNavigationChangeHandler,
  onRequestPreviewElementHandler,
  onRerenderViewHandler
} from '~/utils/tpp'
import * as FSXA_UTILS from '../../utils/fsxa'

beforeEach(() => {
  vi.stubGlobal('location', { reload: vi.fn() })
  window.TPP_SNAP = {
    setPreviewElement: vi.fn(),
    getPreviewElement: vi.fn(),
    isConnected: Promise.resolve(true)
  }
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('tpp utils', () => {
  describe('onNavigationChangeHandler', () => {
    it('call with newPagePreviewId => do nothing', () => {
      onNavigationChangeHandler('foo')

      expect(window.location.reload).not.toHaveBeenCalled()
    })

    it('call with null => call location.reload()', () => {
      onNavigationChangeHandler(null)

      expect(window.location.reload).toHaveBeenCalled()
    })
  })

  describe('onRequestPreviewElementHandler', () => {
    it('with valid preview id => call setPreviewElement', async () => {
      vi.useFakeTimers()
      const promise = onRequestPreviewElementHandler(
        '9266a682-aa19-4723-8761-1c9136945dd4.de_DE'
      )

      expect(window.TPP_SNAP.setPreviewElement).toHaveBeenCalled()

      await vi.runAllTimersAsync()
      await promise
    })

    it('with empty preview id => do nothing', async () => {
      await onRequestPreviewElementHandler('')

      expect(window.TPP_SNAP.setPreviewElement).not.toHaveBeenCalled()
    })
  })

  describe('onRerenderViewHandler', () => {
    it('with valid page preview id and active nav item is page => call fetchPageById', async () => {
      window.TPP_SNAP.getPreviewElement = vi
        .fn()
        .mockResolvedValue('9266a682-aa19-4723-8761-1c9136945dd4.de_DE')

      useState('activeNavigationItem').value = { seoRouteRegex: null }
      vi.spyOn(FSXA_UTILS, 'fetchPageById')

      vi.useFakeTimers()
      const promise = onRerenderViewHandler()
      await vi.runAllTimersAsync()
      await promise

      expect(FSXA_UTILS.fetchPageById).toHaveBeenCalled()
    })

    it('with valid preview id and active nav item is dataset => call fetchDatasetById', async () => {
      window.TPP_SNAP.getPreviewElement = vi
        .fn()
        .mockResolvedValue('9266a682-aa19-4723-8761-1c9136945dd4.de_DE')

      useState('activeNavigationItem').value = { seoRouteRegex: 'some/regex' }
      vi.spyOn(FSXA_UTILS, 'fetchDatasetById')

      vi.useFakeTimers()
      const promise = onRerenderViewHandler()
      await vi.runAllTimersAsync()
      await promise

      expect(FSXA_UTILS.fetchDatasetById).toHaveBeenCalled()
    })

    it('with preview id missing locale => do nothing', async () => {
      window.TPP_SNAP.getPreviewElement = vi
        .fn()
        .mockResolvedValue('9266a682-aa19-4723-8761-1c9136945dd4')

      vi.spyOn(FSXA_UTILS, 'fetchDatasetById')
      vi.spyOn(FSXA_UTILS, 'fetchPageById')

      await onRerenderViewHandler()

      expect(FSXA_UTILS.fetchDatasetById).not.toHaveBeenCalled()
      expect(FSXA_UTILS.fetchPageById).not.toHaveBeenCalled()
    })

    it('with empty preview id => do nothing', async () => {
      window.TPP_SNAP.getPreviewElement = vi.fn().mockResolvedValue('')

      vi.spyOn(FSXA_UTILS, 'fetchDatasetById')
      vi.spyOn(FSXA_UTILS, 'fetchPageById')

      await onRerenderViewHandler()

      expect(FSXA_UTILS.fetchDatasetById).not.toHaveBeenCalled()
      expect(FSXA_UTILS.fetchPageById).not.toHaveBeenCalled()
    })
  })
})
