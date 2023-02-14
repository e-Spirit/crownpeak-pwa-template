import { it, expect, describe, beforeEach } from "vitest";
import { useContent } from "../../composables/content";
import { createPage } from "../testutils/createPage";
import { clearMockedState } from "../testutils/nuxtMocks";

describe("useContent", () => {
  it("useContent => provide default current page, cached pages", () => {
    const { currentPage, cachedPages } = useContent();
    expect(currentPage.value).toBeUndefined();
    expect(cachedPages.value).toEqual({});
  });

  describe("findCachedPageBySeoRoute", () => {
    beforeEach(() => {
      clearMockedState();
    });
    it("item does not exist in cached pages => return undefined", () => {
      const page1 = createPage();
      const page2 = createPage();
      const page3 = createPage();

      const { cachedPages, findCachedPageBySeoRoute } = useContent();

      cachedPages.value[page1.refId] = page1;
      cachedPages.value[page2.refId] = page2;
      cachedPages.value[page3.refId] = page3;

      expect(findCachedPageBySeoRoute("unknown-id")).toBeUndefined();
    });
    it("item exists => return item", () => {
      const page1 = createPage();
      const page2 = createPage();
      const page3 = createPage();

      const { cachedPages, findCachedPageBySeoRoute } = useContent();

      cachedPages.value[page1.refId] = page1;
      cachedPages.value[page2.refId] = page2;
      cachedPages.value[page3.refId] = page3;

      expect(findCachedPageBySeoRoute(page2.refId)).toBe(page2);
    });
  });
  describe("addToCache", () => {
    beforeEach(() => {
      clearMockedState();
    });
    it("item does not exist => add new item", () => {
      const page1 = createPage();
      const page2 = createPage();
      const page3 = createPage();

      const { cachedPages, addToCache } = useContent();

      addToCache(page1.refId, page1);
      addToCache(page2.refId, page2);
      addToCache(page3.refId, page3);

      expect(cachedPages.value[page1.refId]).toBe(page1);
      expect(cachedPages.value[page2.refId]).toBe(page2);
      expect(cachedPages.value[page3.refId]).toBe(page3);

      expect(Object.keys(cachedPages.value).length).toBe(3);
    });
    it("item exists => don't add new item", () => {
      const page1 = createPage();
      const page2 = createPage();

      const { cachedPages, addToCache } = useContent();

      addToCache(page1.refId, page1);
      addToCache(page2.refId, page2);
      addToCache(page2.refId, page2);

      expect(cachedPages.value[page1.refId]).toBe(page1);
      expect(cachedPages.value[page2.refId]).toBe(page2);

      expect(Object.keys(cachedPages.value).length).toBe(2);
    });
  });
});
