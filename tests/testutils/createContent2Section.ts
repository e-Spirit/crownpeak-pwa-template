import { Content2Section } from "fsxa-api/dist/types";
import { faker } from "@faker-js/faker";

export function createContent2Section(
  optionalContent2Section?: Partial<Content2Section>
): Content2Section {
  const content2section: Content2Section = {
    type: "Content2Section",
    sectionType: faker.name.firstName(),
    data: {
      schema: faker.name.firstName(),
      entityType: faker.name.firstName(),
      query: faker.name.firstName(),
      recordCountPerPage: faker.datatype.number(),
      maxPageCount: faker.datatype.number(),
      filterParams: {},
      ordering: [],
    },
    children: [],
  };
  return { ...content2section, ...optionalContent2Section };
}
