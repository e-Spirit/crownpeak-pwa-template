import { it, expect, describe, beforeEach } from "vitest";
import { useContent } from "../../composables/content";
import { createPage } from "../testutils/createPage";
import { createDataset } from "../testutils/createDataset";
import { clearMockedState } from "../testutils/nuxtMocks";

describe("useContent", () => {
  it("useContent => provide default current page, current dataset, cached pages, cached dataset", () => {
    const { currentPage, cachedPages, currentDataset, cachedDatasets } =
      useContent();
    expect(currentPage.value).toBeUndefined();
    expect(currentDataset.value).toBeUndefined();
    expect(cachedPages.value).toEqual({});
    expect(cachedDatasets.value).toEqual({});
  });

  describe("findCachedPageByRoute", () => {
    beforeEach(() => {
      clearMockedState();
    });
    it("item does not exist in cached pages => return undefined", () => {
      const page1 = createPage();
      const page2 = createPage();
      const page3 = createPage();

      const { cachedPages, findCachedPageByRoute } = useContent();

      cachedPages.value[page1.refId] = page1;
      cachedPages.value[page2.refId] = page2;
      cachedPages.value[page3.refId] = page3;

      expect(findCachedPageByRoute("unknown-id")).toBeUndefined();
    });
    it("item exists => return item", () => {
      const page1 = createPage();
      const page2 = createPage();
      const page3 = createPage();

      const { cachedPages, findCachedPageByRoute } = useContent();

      cachedPages.value[page1.refId] = page1;
      cachedPages.value[page2.refId] = page2;
      cachedPages.value[page3.refId] = page3;

      expect(findCachedPageByRoute(page2.refId)).toBe(page2);
    });
  });
  describe("findCachedDatasetByRoute", () => {
    beforeEach(() => {
      clearMockedState();
    });
    it("item does not exist in cached datasets => return undefined", () => {
      const dataset1 = createDataset();
      const dataset2 = createDataset();
      const dataset3 = createDataset();

      const { cachedDatasets, findCachedDatasetByRoute } = useContent();

      cachedDatasets.value[dataset1.route] = dataset1;
      cachedDatasets.value[dataset2.route] = dataset2;
      cachedDatasets.value[dataset3.route] = dataset3;

      expect(findCachedDatasetByRoute("unknown-route")).toBeUndefined();
    });
    it("item exists => return item", () => {
      const dataset1 = createDataset();
      const dataset2 = createDataset();
      const dataset3 = createDataset();

      const { cachedDatasets, findCachedDatasetByRoute } = useContent();

      cachedDatasets.value[dataset1.route] = dataset1;
      cachedDatasets.value[dataset2.route] = dataset2;
      cachedDatasets.value[dataset3.route] = dataset3;

      expect(findCachedDatasetByRoute(dataset2.route)).toBe(dataset2);
    });
  });
  describe("findCachedProductsByRoute", () => {
    beforeEach(() => {
      clearMockedState();
    });
    it("products do not exist in cached products => return undefined", () => {
      const dataset1 = createDataset();
      const dataset2 = createDataset();
      const dataset3 = createDataset();

      const { cachedProducts, findCachedProductsByRoute } = useContent();

      cachedProducts.value[dataset1.route] = dataset1;
      cachedProducts.value[dataset2.route] = dataset2;
      cachedProducts.value[dataset3.route] = dataset3;

      expect(findCachedProductsByRoute("unknown-id")).toBeUndefined();
    });
    it("products exist => return products", () => {
      const dataset1 = createDataset();
      const dataset2 = createDataset();
      const dataset3 = createDataset();

      const { cachedProducts, findCachedProductsByRoute } = useContent();

      cachedProducts.value[dataset1.route] = dataset1;
      cachedProducts.value[dataset2.route] = dataset2;
      cachedProducts.value[dataset3.route] = dataset3;

      expect(findCachedProductsByRoute(dataset2.route)).toBe(dataset2);
    });
  });
  describe("addToCachedPages", () => {
    beforeEach(() => {
      clearMockedState();
    });
    it("item does not exist => add new item", () => {
      const page1 = createPage();
      const page2 = createPage();
      const page3 = createPage();

      const { cachedPages, addToCachedPages } = useContent();

      addToCachedPages(page1.refId, page1);
      addToCachedPages(page2.refId, page2);
      addToCachedPages(page3.refId, page3);

      expect(cachedPages.value[page1.refId]).toBe(page1);
      expect(cachedPages.value[page2.refId]).toBe(page2);
      expect(cachedPages.value[page3.refId]).toBe(page3);

      expect(Object.keys(cachedPages.value).length).toBe(3);
    });
    it("item exists => don't add new item", () => {
      const page1 = createPage();
      const page2 = createPage();

      const { cachedPages, addToCachedPages } = useContent();

      addToCachedPages(page1.refId, page1);
      addToCachedPages(page2.refId, page2);
      addToCachedPages(page2.refId, page2);

      expect(cachedPages.value[page1.refId]).toBe(page1);
      expect(cachedPages.value[page2.refId]).toBe(page2);

      expect(Object.keys(cachedPages.value).length).toBe(2);
    });
  });

  describe("addToCachedDatasets", () => {
    beforeEach(() => {
      clearMockedState();
    });
    it("item does not exist => add new item", () => {
      const dataset1 = createDataset();
      const dataset2 = createDataset();
      const dataset3 = createDataset();

      const { cachedDatasets, addToCachedDatasets } = useContent();

      addToCachedDatasets(dataset1.route, dataset1);
      addToCachedDatasets(dataset2.route, dataset2);
      addToCachedDatasets(dataset3.route, dataset3);

      expect(cachedDatasets.value[dataset1.route]).toBe(dataset1);
      expect(cachedDatasets.value[dataset2.route]).toBe(dataset2);
      expect(cachedDatasets.value[dataset3.route]).toBe(dataset3);

      expect(Object.keys(cachedDatasets.value).length).toBe(3);
    });
    it("item exists => don't add new item", () => {
      const dataset1 = createDataset();
      const dataset2 = createDataset();

      const { cachedDatasets, addToCachedDatasets } = useContent();

      addToCachedDatasets(dataset1.route, dataset1);
      addToCachedDatasets(dataset2.route, dataset2);
      addToCachedDatasets(dataset2.route, dataset2);

      expect(cachedDatasets.value[dataset1.route]).toBe(dataset1);
      expect(cachedDatasets.value[dataset2.route]).toBe(dataset2);

      expect(Object.keys(cachedDatasets.value).length).toBe(2);
    });
  });

  describe("addToCachedProducts", () => {
    beforeEach(() => {
      clearMockedState();
    });
    it("item does not exist => add new item", () => {
      const dataset1 = createDataset();
      const dataset2 = createDataset();
      const dataset3 = createDataset();

      const { cachedProducts, addToCachedProducts } = useContent();

      addToCachedProducts("route", [dataset1, dataset2, dataset3]);

      expect(cachedProducts.value["route"]).toStrictEqual([
        dataset1,
        dataset2,
        dataset3,
      ]);

      expect(Object.keys(cachedProducts.value).length).toBe(1);
    });
    it("item exists => don't add new item", () => {
      const dataset1 = createDataset();
      const dataset2 = createDataset();

      const { cachedProducts, addToCachedProducts } = useContent();

      addToCachedProducts("route", [dataset1]);
      addToCachedProducts("route", [dataset2]);

      expect(cachedProducts.value["route"]).toStrictEqual([dataset1]);

      expect(Object.keys(cachedProducts.value["route"]).length).toBe(1);
    });
  });
});
