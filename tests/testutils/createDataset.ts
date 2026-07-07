import type { Dataset } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createDataset(optionalDataset?: Partial<Dataset>): Dataset {
  const dataset: Dataset = {
    type: 'Dataset',
    id: faker.string.uuid(),
    previewId: faker.string.uuid(),
    schema: faker.person.firstName(),
    entityType: faker.person.firstName(),
    template: faker.person.firstName(),
    route: faker.internet.url(),
    routes: [],
    locale: faker.location.countryCode(),
    data: {},
    children: []
  }
  return { ...dataset, ...optionalDataset }
}
