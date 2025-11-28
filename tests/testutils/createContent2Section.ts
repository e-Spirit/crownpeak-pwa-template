import type { Content2Section } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createContent2Section(
  optionalContent2Section?: Partial<Content2Section>
): Content2Section {
  const content2section: Content2Section = {
    type: 'Content2Section',
    sectionType: faker.person.firstName(),
    data: {
      schema: faker.person.firstName(),
      entityType: faker.person.firstName(),
      query: faker.person.firstName(),
      recordCountPerPage: faker.number.int(),
      maxPageCount: faker.number.int(),
      filterParams: {},
      ordering: []
    },
    children: []
  }
  return { ...content2section, ...optionalContent2Section }
}
