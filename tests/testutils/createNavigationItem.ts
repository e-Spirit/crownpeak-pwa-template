import { NavigationItem } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createNavigationItem(
  optionalNavigationItem?: Partial<NavigationItem>
): NavigationItem {
  const NavigationItem: NavigationItem = {
    caasDocumentId: faker.datatype.uuid(),
    id: faker.datatype.uuid(),
    contentReference: faker.internet.url(),
    customData: {},
    seoRoute: faker.random.word(),
    seoRouteRegex: null,
    label: faker.random.word(),
    permissions: {
      allowed: [],
      denied: []
    },
    parentIds: []
  }
  return { ...NavigationItem, ...optionalNavigationItem }
}
