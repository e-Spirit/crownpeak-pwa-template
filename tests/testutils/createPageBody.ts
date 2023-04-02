import { PageBody } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createPageBody(optionalPageBody?: Partial<PageBody>): PageBody {
  const pageBody: PageBody = {
    type: 'PageBody',
    name: faker.word.noun(),
    previewId: faker.datatype.uuid(),
    children: []
  }
  return { ...pageBody, ...optionalPageBody }
}
