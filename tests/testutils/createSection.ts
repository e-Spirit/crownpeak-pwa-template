import { Section } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createSection(optionalSection?: Partial<Section>): Section {
  const section: Section = {
    type: 'Section',
    id: faker.datatype.uuid(),
    previewId: faker.datatype.uuid(),
    sectionType: faker.name.firstName(),
    data: {},
    children: []
  }

  return { ...section, ...optionalSection }
}
