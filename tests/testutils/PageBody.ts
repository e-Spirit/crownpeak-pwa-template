import { PageBody } from "fsxa-api/dist/types";
import { faker } from "@faker-js/faker";

export function createPageBody(optionalPageBody?: Partial<PageBody>) {
  const pageBody: PageBody = {
    type: "PageBody",
    name: optionalPageBody?.name || faker.word.noun(),
    previewId: optionalPageBody?.previewId || faker.datatype.uuid(),
    children: optionalPageBody?.children || [],
  };
  return pageBody;
}
