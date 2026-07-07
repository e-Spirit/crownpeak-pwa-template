import type { NavigationData } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createNavigationData(
  optionalNavigationData?: Partial<NavigationData>
): NavigationData {
  const navigationData: NavigationData = {
    idMap: {},
    seoRouteMap: {},
    meta: {
      identifier: {
        tenantId: faker.word.sample(),
        navigationId: faker.word.sample(),
        languageId: faker.location.countryCode()
      }
    },
    pages: {
      index: faker.word.sample()
    },
    structure: []
  }
  return { ...navigationData, ...optionalNavigationData }
}
