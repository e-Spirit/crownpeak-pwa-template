import type { NavigationItem } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createNavigationItem(
  optionalNavigationItem?: Partial<NavigationItem>
): NavigationItem {
  const NavigationItem: NavigationItem = {
    caasDocumentId: faker.string.uuid(),
    id: faker.string.uuid(),
    contentReference: faker.internet.url(),
    customData: {},
    seoRoute: faker.word.sample(),
    seoRouteRegex: null,
    label: faker.word.sample(),
    permissions: {
      allowed: [],
      denied: []
    },
    parentIds: []
  }
  return { ...NavigationItem, ...optionalNavigationItem }
}
