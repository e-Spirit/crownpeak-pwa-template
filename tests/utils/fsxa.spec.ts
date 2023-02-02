import { it, expect, describe, vi } from "vitest";
import { NavigationItem } from "fsxa-api/dist/types";
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
import content from "../fixtures/content.json";

describe("fsxa utils", () => {
  describe("fetchTopLevelNavigation", () => {
    it("should call fetchNavigation and pass down locale", async () => {
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
    it("should return the locale from the contentReference", () => {
      expect(getLocaleFromNavigationItem(navigationItem)).toBe("en_GB");
    });

    it("should throw an error if no contentReference is present", () => {
      expect(() => getLocaleFromNavigationItem({} as any)).toThrow();
    });

    it("should throw an error if no locale is present", () => {
      expect(() =>
        getLocaleFromNavigationItem({ contentReference: "foo" } as any)
      ).toThrow();
    });
  });

  describe("fetchContentById", () => {
    it("should call fetchContentById and pass down locale and id", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchElement = vi.fn().mockReturnValue({});

      expect(await fetchContentById(fsxaApi, "de_DE", "123")).toStrictEqual({});

      expect(fsxaApi.fetchElement).toHaveBeenCalledWith({
        locale: "de_DE",
        id: "123",
      });
    });
  });

  describe("fetchDatasetBySeoRoute", () => {
    it("should call fetchByFilter", async () => {
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
    it("should return content", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter);
      fsxaApi.fetchElement = vi.fn().mockReturnValue(content);

      expect(
        await fetchContentBySeoRoute(fsxaApi, "de_DE", "/some/route")
      ).toStrictEqual(content);

      expect(fsxaApi.fetchElement).toHaveBeenCalled();
      expect(fsxaApi.fetchByFilter).toHaveBeenCalled();
    });
  });

  describe("fetchContentFromNavigationItem", () => {
    it("should not call fetchDatasetBySeoRoute if not projection", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter);
      fsxaApi.fetchElement = vi.fn().mockReturnValue(content);

      expect(
        await fetchContentFromNavigationItem(fsxaApi, navigationItem, "de_DE")
      ).toStrictEqual(content);

      expect(fsxaApi.fetchElement).toHaveBeenCalled();
      expect(fsxaApi.fetchByFilter).not.toHaveBeenCalled();
    });
    it("should call fetchDatasetBySeoRoute if projection", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchByFilter = vi.fn().mockReturnValue(datasetsFilter);
      fsxaApi.fetchElement = vi.fn().mockReturnValue(content);

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
      ).toStrictEqual(content);

      expect(fsxaApi.fetchElement).toHaveBeenCalled();
      expect(fsxaApi.fetchByFilter).toHaveBeenCalled();
    });
  });
  describe("fetchNavigationItemFromRoute", () => {
    it("should return the navigation item", async () => {
      const {
        provide: { fsxaApi },
      } = setupProxyApi();

      fsxaApi.fetchNavigation = vi.fn().mockReturnValue(navigationData);

      expect(
        await fetchNavigationItemFromRoute(fsxaApi, "/Home/")
      ).toStrictEqual(Object.values(navigationData.idMap)[0]);
    });

    it("should return the index navigation item for /", async () => {
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

    it("should throw if route does not exist", () => {
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
