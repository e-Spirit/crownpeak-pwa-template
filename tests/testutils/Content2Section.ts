import { Content2Section } from "fsxa-api/dist/types";
import { faker } from "@faker-js/faker";

export function createContent2Section(
  optionalContent2Section?: Partial<Content2Section>
) {
  const content2section: Content2Section = {
    type: "Content2Section",
    sectionType: optionalContent2Section?.sectionType || faker.name.firstName(),
    data: {
      schema: optionalContent2Section?.data?.schema || faker.name.firstName(),
      entityType:
        optionalContent2Section?.data?.entityType || faker.name.firstName(),
      query: optionalContent2Section?.data?.query || faker.name.firstName(),
      recordCountPerPage:
        optionalContent2Section?.data?.recordCountPerPage ||
        faker.datatype.number(),
      maxPageCount:
        optionalContent2Section?.data?.maxPageCount || faker.datatype.number(),
      filterParams: optionalContent2Section?.data?.filterParams || {},
      ordering: optionalContent2Section?.data?.ordering || [],
    },
    children: optionalContent2Section?.children || [],
  };
  return content2section;
}
