import { Page, Dataset } from "fsxa-api";

export function useContent() {
  const currentDataset = useState<Dataset | null>("currentDataset");
  const cachedDatasets = useState<{
    [caasId: string]: Dataset;
  }>("cachedDatasets", () => ({}));

  function findCachedDatasetByRoute(route: string) {
    return cachedDatasets.value[route];
  }
  function addToCachedDatasets(route: string, data: Dataset) {
    if (!cachedPages.value[route]) cachedDatasets.value[route] = data;
  }

  const currentPage = useState<Page | null>("currentPage");
  const cachedPages = useState<{
    [caasId: string]: Page;
  }>("cachedPages", () => ({}));

  function findCachedPageByRoute(route: string) {
    return cachedPages.value[route];
  }

  function addToCachedPages(route: string, data: Page) {
    if (!cachedPages.value[route]) cachedPages.value[route] = data;
  }

  return {
    currentPage,
    currentDataset,
    cachedPages,
    cachedDatasets,
    addToCachedPages,
    addToCachedDatasets,
    findCachedPageByRoute,
    findCachedDatasetByRoute,
  };
}
