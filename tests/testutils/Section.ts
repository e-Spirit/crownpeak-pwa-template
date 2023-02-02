import { Section } from "fsxa-api/dist/types";
import { faker } from "@faker-js/faker";

export function createSection(optionalSection?: Partial<Section>) {
  const section: Section = {
    type: "Section",
    id: optionalSection?.id || faker.datatype.uuid(),
    previewId: optionalSection?.id || faker.datatype.uuid(),
    sectionType: optionalSection?.sectionType || faker.name.firstName(),
    data: optionalSection?.data || {},
    children: optionalSection?.children || [],
  };

  return section;
}
