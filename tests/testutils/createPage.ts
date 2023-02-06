import { Page } from "fsxa-api";
import { faker } from "@faker-js/faker";

export function createPage(optionalPage?: Partial<Page>): Page {
  const refId = faker.datatype.uuid();
  const page: Page = {
    layout: faker.random.word(),
    meta: {},
    type: "Page",
    metaPageRef: {},
    name: faker.random.word(),
    refId,
    id: faker.datatype.uuid(),
    previewId: refId + "." + faker.random.locale(),
    data: {},
    children: [],
  };
  return { ...page, ...optionalPage };
}
