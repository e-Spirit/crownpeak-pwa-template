import type { Page } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createPage(optionalPage?: Partial<Page>): Page {
  const refId = faker.string.uuid()
  const page: Page = {
    layout: faker.word.sample(),
    meta: {},
    type: 'Page',
    metaPageRef: {},
    name: faker.word.sample(),
    refId,
    route: '/',
    id: faker.string.uuid(),
    previewId: refId + '.' + faker.location.countryCode(),
    data: {},
    children: []
  }
  return { ...page, ...optionalPage }
}
