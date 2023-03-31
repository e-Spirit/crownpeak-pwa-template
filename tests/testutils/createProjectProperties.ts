import { ProjectProperties } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createProjectProperties(
  optionalProjectProperties?: Partial<ProjectProperties>
): ProjectProperties {
  const projectProperties: ProjectProperties = {
    id: faker.datatype.uuid(),
    data: {},
    layout: faker.random.word(),
    name: faker.random.word(),
    meta: {},
    previewId: faker.datatype.uuid(),
    type: 'ProjectProperties'
  }
  return { ...projectProperties, ...optionalProjectProperties }
}
