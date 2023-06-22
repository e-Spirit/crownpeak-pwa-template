import { Dataset } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createDataset(optionalDataset?: Partial<Dataset>): Dataset {
  const dataset: Dataset = {
    type: 'Dataset',
    id: faker.datatype.uuid(),
    previewId: faker.datatype.uuid(),
    schema: faker.name.firstName(),
    entityType: faker.name.firstName(),
    template: faker.name.firstName(),
    route: faker.internet.url(),
    routes: [],
    locale: faker.random.locale(),
    data: {},
    children: []
  }
  return { ...dataset, ...optionalDataset }
}
