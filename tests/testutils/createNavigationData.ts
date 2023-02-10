import { NavigationData } from "fsxa-api";
import { faker } from "@faker-js/faker";

export function createNavigationData(
  optionalNavigationData?: Partial<NavigationData>
): NavigationData {
  const navigationData: NavigationData = {
    idMap: {},
    seoRouteMap: {},
    meta: {
      identifier: {
        tenantId: faker.random.word(),
        navigationId: faker.random.word(),
        languageId: faker.random.locale(),
      },
    },
    pages: {
      index: faker.random.word(),
    },
    structure: [],
  };
  return { ...navigationData, ...optionalNavigationData };
}
