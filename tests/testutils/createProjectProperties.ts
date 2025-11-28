import type { ProjectProperties } from 'fsxa-api'
import { faker } from '@faker-js/faker'

export function createProjectProperties(
  optionalProjectProperties?: Partial<ProjectProperties>
): ProjectProperties {
  const projectProperties: ProjectProperties = {
    id: faker.string.uuid(),
    data: {},
    layout: faker.word.sample(),
    name: faker.word.sample(),
    meta: {},
    previewId: faker.string.uuid(),
    type: 'ProjectProperties'
  }
  return { ...projectProperties, ...optionalProjectProperties }
}
