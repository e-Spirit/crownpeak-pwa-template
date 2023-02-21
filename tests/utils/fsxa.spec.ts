import { it, expect, describe, vi } from "vitest";
import { NavigationItem } from "fsxa-api";
import setupProxyApi from "../../plugins/2.setupProxyApi";
import {
  fetchTopLevelNavigation,
  getLocaleFromNavigationItem,
  fetchContentById,
  fetchContentBySeoRoute,
  fetchDatasetBySeoRoute,
  fetchContentFromNavigationItem,
  fetchNavigationItemFromRoute,
} from "../../utils/fsxa";
import navigationData from "../fixtures/navigationDataSeoRoute.json";
import navigationItem from "../fixtures/navigationItem.json";
import datasetsFilter from "../fixtures/datasetsFilter.json";
import page from "../fixtures/content.json";

describe("fsxa utils", () => {
  describe("fetchTopLevelNavigation", () => {
    it("call with valid locale => get navigation data, call fsxaApi.fetchNavigation with locale", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchNavigation = vi.fn().mockReturnValue(navigationData);

      expect(await fetchTopLevelNavigation(fsxaApi, "de_DE")).toStrictEqual(
        navigationData
      );

      expect(fsxaApi.fetchNavigation).toHaveBeenCalledWith({
        locale: "de_DE",
      });
    });
  });

  describe("getLocaleFromNavigationItem", () => {
    it("call with contentReference => return the locale from the contentReference", () => {
      expect(getLocaleFromNavigationItem(navigationItem)).toBe("en_GB");
    });

    it("call without contentReference => throw an error", () => {
      expect(() => getLocaleFromNavigationItem({} as any)).toThrow();
    });

    it("call with contentReference without locale => throw an error", () => {
      expect(() =>
        getLocaleFromNavigationItem({ contentReference: "foo" } as any)
      ).toThrow();
    });
  });

  describe("fetchContentById", () => {
    it("call with valid locale and id => call fsxaApi.fetchElement with locale and id, return element", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchElement = vi.fn().mockReturnValue({});

      expect(await fetchContentById(fsxaApi, "de_DE", "123")).toStrictEqual({
        page: {},
        dataset: null,
      });

      expect(fsxaApi.fetchElement).toHaveBeenCalledWith({
        locale: "de_DE",
        id: "123",
      });
    });
  });

  describe("fetchDatasetBySeoRoute", () => {
    it("call with valid params => call fsxaApi.fetchByFilter with same params, return filtered items", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter);

      expect(
        await fetchDatasetBySeoRoute(fsxaApi, "de_DE", "/some/route")
      ).toStrictEqual(datasetsFilter.items[0]);

      expect(fsxaApi.fetchByFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          locale: "de_DE",
          filters: expect.any(Array),
        })
      );
    });
  });

  describe("fetchContentBySeoRoute", () => {
    it("call with locale and route => return content", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter);
      fsxaApi.fetchElement = vi.fn().mockReturnValue(page);

      expect(
        await fetchContentBySeoRoute(fsxaApi, "de_DE", "/some/route")
      ).toStrictEqual({ dataset: datasetsFilter.items[0], page });

      expect(fsxaApi.fetchElement).toHaveBeenCalled();
      expect(fsxaApi.fetchByFilter).toHaveBeenCalled();
    });
  });

  describe("fetchContentFromNavigationItem", () => {
    it("call with data that is not projection => should not call fetchDatasetBySeoRoute (fetchByFilter)", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter);
      fsxaApi.fetchElement = vi.fn().mockReturnValue(page);

      expect(
        await fetchContentFromNavigationItem(fsxaApi, navigationItem, "de_DE")
      ).toStrictEqual({ dataset: null, page });

      expect(fsxaApi.fetchElement).toHaveBeenCalled();
      expect(fsxaApi.fetchByFilter).not.toHaveBeenCalled();
    });
    it("call with projection => call fetchDatasetBySeoRoute", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter);
      fsxaApi.fetchElement = vi.fn().mockReturnValue(page);

      const projectedNavigationItem: NavigationItem = {
        ...navigationItem,
        seoRouteRegex: "/some/route",
      };

      expect(
        await fetchContentFromNavigationItem(
          fsxaApi,
          projectedNavigationItem,
          "de_DE"
        )
      ).toStrictEqual({ dataset: datasetsFilter.items[0], page });

      expect(fsxaApi.fetchElement).toHaveBeenCalled();
      expect(fsxaApi.fetchByFilter).toHaveBeenCalled();
    });
  });
  describe("fetchNavigationItemFromRoute", () => {
    it("call with valid data => return the navigation item", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchNavigation = vi.fn().mockReturnValue(navigationData);

      expect(
        await fetchNavigationItemFromRoute(fsxaApi, "/Home/")
      ).toStrictEqual(Object.values(navigationData.idMap)[0]);
    });

    it("call with / => return the index navigation item", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchNavigation = vi.fn().mockReturnValue(navigationData);

      expect(await fetchNavigationItemFromRoute(fsxaApi, "/")).toStrictEqual(
        navigationData.idMap[
          navigationData.seoRouteMap[navigationData.pages.index]
        ]
      );
    });

    it("call with missing route => throw", () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchNavigation = vi.fn().mockReturnValue(navigationData);

      expect(
        fetchNavigationItemFromRoute(fsxaApi, "/doesnotexist/")
      ).rejects.toThrow();
    });
  });
});
