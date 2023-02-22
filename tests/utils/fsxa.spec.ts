import { it, expect, describe, vi } from "vitest";
import { NavigationItem } from "fsxa-api";
import setupProxyApi from "../../plugins/2.setupProxyApi";
import {
  fetchTopLevelNavigation,
  getLocaleFromNavigationItem,
  fetchPageById,
  fetchPageByRoute,
  fetchDatasetByRoute,
  fetchPageFromNavigationItem,
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

  describe("fetchPageById", () => {
    it("call with valid locale and id => call fsxaApi.fetchElement with locale and id, return element", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchElement = vi.fn().mockReturnValue({});

      expect(await fetchPageById(fsxaApi, "de_DE", "123")).toStrictEqual({});

      expect(fsxaApi.fetchElement).toHaveBeenCalledWith({
        locale: "de_DE",
        id: "123",
      });
    });
  });

  describe("fetchDatasetByRoute", () => {
    it("call with valid params => call fsxaApi.fetchByFilter with same params, return filtered items", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter);

      expect(
        await fetchDatasetByRoute(fsxaApi, "de_DE", "/some/route")
      ).toStrictEqual(datasetsFilter.items[0]);

      expect(fsxaApi.fetchByFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          locale: "de_DE",
          filters: expect.any(Array),
        })
      );
    });
  });

  describe("fetchPageByRoute", () => {
    it("call with locale and route => return content", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter);
      fsxaApi.fetchElement = vi.fn().mockReturnValue(page);

      expect(
        await fetchPageByRoute(fsxaApi, "de_DE", "/some/route")
      ).toStrictEqual(page);

      expect(fsxaApi.fetchElement).toHaveBeenCalled();
      expect(fsxaApi.fetchByFilter).toHaveBeenCalled();
    });
  });

  describe("fetchPageFromNavigationItem", () => {
    it("call with data that is not projection => should not call fetchDatasetByRoute (fetchByFilter)", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter);
      fsxaApi.fetchElement = vi.fn().mockReturnValue(page);

      expect(
        await fetchPageFromNavigationItem(fsxaApi, navigationItem, "de_DE")
      ).toStrictEqual(page);

      expect(fsxaApi.fetchElement).toHaveBeenCalled();
      expect(fsxaApi.fetchByFilter).not.toHaveBeenCalled();
    });
    it("call with projection => call fetchDatasetByRoute", async () => {
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
        await fetchPageFromNavigationItem(
          fsxaApi,
          projectedNavigationItem,
          "de_DE"
        )
      ).toStrictEqual(page);

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
