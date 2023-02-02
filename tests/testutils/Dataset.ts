import { Dataset } from "fsxa-api/dist/types";
import { faker } from "@faker-js/faker";

export function createDataset(optionalDataset?: Partial<Dataset>) {
  const dataset: Dataset = {
    type: "Dataset",
    id: optionalDataset?.id || faker.datatype.uuid(),
    previewId: optionalDataset?.id || faker.datatype.uuid(),
    schema: optionalDataset?.schema || faker.name.firstName(),
    entityType: optionalDataset?.entityType || faker.name.firstName(),
    template: optionalDataset?.template || faker.name.firstName(),
    route: optionalDataset?.route || faker.internet.url(),
    routes: optionalDataset?.routes || [],
    locale: optionalDataset?.locale || faker.random.locale(),
    data: optionalDataset?.data || {},
    children: optionalDataset?.children || [],
  };
  return dataset;
}
