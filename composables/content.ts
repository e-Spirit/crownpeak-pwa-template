import { Page, Dataset } from "fsxa-api";

export function useContent() {
  const currentDataset = useState<Dataset | null>("currentDataset");
  const cachedDatasets = useState<{
    [caasId: string]: Dataset;
  }>("cachedDatasets", () => ({}));
  /**
   * Find dataset in cache by route
   * @param route Route
   * @returns Dataset or undefined
   */
  function findCachedDatasetByRoute(route: string) {
    return cachedDatasets.value[route];
  }
  /**
   * Add dataset to cache for given route if it has not been cached yet
   * @param route Route
   * @param data Dataset
   * @returns
   */
  function addToCachedDatasets(route: string, data: Dataset) {
    if (!cachedPages.value[route]) cachedDatasets.value[route] = data;
  }

  const currentPage = useState<Page | null>("currentPage");
  const cachedPages = useState<{
    [caasId: string]: Page;
  }>("cachedPages", () => ({}));
  /**
   * Find page in cache by route
   * @param route Route
   * @returns page or undefined
   */
  function findCachedPageByRoute(route: string) {
    return cachedPages.value[route];
  }
  /**
   * Add page to cache for given route if it has not been cached yet
   * @param route Route
   * @param page Page
   * @returns
   */
  function addToCachedPages(route: string, data: Page) {
    if (!cachedPages.value[route]) cachedPages.value[route] = data;
  }

  const cachedProducts = useState<{
    [caasId: string]: Dataset[];
  }>("cachedDatasets", () => ({}));

  /**
   * Find products in cache by route
   * @param route Route
   * @returns products or undefined
   */
  function findCachedProductsByRoute(route: string) {
    return cachedProducts.value[route];
  }

  /**
   * Add products to cache for given route if they have not been cached yet
   * @param route Route
   * @param data Dataset[]
   * @returns
   */
  function addToCachedProducts(route: string, data: Dataset[]) {
    if (!cachedProducts.value[route]) cachedProducts.value[route] = data;
  }

  return {
    currentPage,
    currentDataset,
    cachedPages,
    cachedDatasets,
    addToCachedPages,
    addToCachedDatasets,
    addToCachedProducts,
    findCachedPageByRoute,
    findCachedDatasetByRoute,
    findCachedProductsByRoute,
  };
}
