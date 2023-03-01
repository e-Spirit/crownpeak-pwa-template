import { it, expect, describe, beforeEach } from "vitest";
import { useNavigationData } from "../../composables/navigation";
import navigationItemFixture from "../fixtures/navigationItem.json";
import navigationDataFixture from "../fixtures/toplevelNavigation_en_GB.json";
import { clearMockedState, useLocale } from "../testutils/nuxtMocks";
import { createNavigationData } from "../testutils/createNavigationData";
import { createNavigationItem } from "../testutils/createNavigationItem";

describe("useNavigationData", () => {
  beforeEach(() => {
    clearMockedState();
  });
  it("useNavigationData => provide undefined default navigationData and activeNavigationItem", () => {
    const { navigationData, activeNavigationItem } = useNavigationData();

    expect(navigationData.value).toBeUndefined();
    expect(activeNavigationItem.value).toBeUndefined();
  });

  it("setActiveNavigationItem => set the active navigation item", () => {
    const { setActiveNavigationItem, activeNavigationItem } =
      useNavigationData();

    setActiveNavigationItem(navigationItemFixture);

    expect(activeNavigationItem.value).toStrictEqual(navigationItemFixture);
  });

  describe("getIndexRoute", () => {
    it("navigation data exists => return the index route from existing navigation data", async () => {
      const { getIndexRoute, navigationData } = useNavigationData();
      navigationData.value = createNavigationData();

      expect(await getIndexRoute()).toEqual(navigationData.value.pages.index);
    });

    it("navigation data does not exist => fetch navigation data, return index route", async () => {
      const { getIndexRoute, navigationData } = useNavigationData();

      expect(navigationData.value).toBeUndefined();

      expect(await getIndexRoute()).toEqual("/Startseite/");

      expect(navigationData.value).not.toBeUndefined();
    });
  });

  describe("determineNavigationStateFromRoute", () => {
    it("navigation item exists for given route => set active locale and active navigation item", async () => {
      const {
        determineNavigationStateFromRoute,
        navigationData,
        activeNavigationItem,
      } = useNavigationData();
      const { activeLocale } = useLocale();

      const navigationItem = createNavigationItem({
        contentReference: "itemurl.en_GB",
      });
      navigationData.value = createNavigationData();
      navigationData.value.seoRouteMap[navigationItem.seoRoute] =
        navigationItem.id;
      navigationData.value.idMap[navigationItem.id] = navigationItem;

      expect(activeLocale.value).toBeUndefined();
      expect(activeNavigationItem.value).toBeUndefined();
      await determineNavigationStateFromRoute(navigationItem.seoRoute);

      expect(activeLocale.value).toBe("en_GB");
      expect(activeNavigationItem.value).toBe(navigationItem);
    });
    it("navigation item does not exist for given route => fetchnavigation item, set active locale and active navigation item", async () => {
      const { determineNavigationStateFromRoute, activeNavigationItem } =
        useNavigationData();
      const { activeLocale } = useLocale();

      // home page from fixture
      // navigation data fixture is returned from $fsxa.getNavigationData
      const navigationItem =
        navigationDataFixture.idMap["5a7cdf48-5031-4fcd-b6c7-99e802d0ce57"];

      expect(activeLocale.value).toBeUndefined();
      expect(activeNavigationItem.value).toBeUndefined();

      await determineNavigationStateFromRoute(navigationItem.seoRoute);

      expect(activeLocale.value).toBe("en_GB");
      expect(activeNavigationItem.value).toStrictEqual(navigationItem);
    });
  });
  describe("findNavigationItemById", () => {
    it("call with existing id => return navigationItem", () => {
      const { findNavigationItemById, navigationData } = useNavigationData();

      const navigationItem = createNavigationItem();

      navigationData.value = createNavigationData();

      navigationData.value.idMap[navigationItem.id] = navigationItem;

      const item = findNavigationItemById(navigationItem.id);

      expect(item).toBe(navigationItem);
    });

    it("call with unknown id => return null", () => {
      const { findNavigationItemById, navigationData } = useNavigationData();

      const navigationItem = createNavigationItem();

      navigationData.value = createNavigationData();

      navigationData.value.idMap[navigationItem.id] = navigationItem;

      const item = findNavigationItemById("unknown-id");

      expect(item).toBe(null);
    });
  });
  describe("findNavigationItemByRoute", () => {
    it("call with existing route => return navigationItem", () => {
      const { findNavigationItemByRoute, navigationData } = useNavigationData();

      const navigationItem = createNavigationItem();

      navigationData.value = createNavigationData();

      navigationData.value.seoRouteMap[navigationItem.seoRoute] =
        navigationItem.id;
      navigationData.value.idMap[navigationItem.id] = navigationItem;

      const item = findNavigationItemByRoute(navigationItem.seoRoute);

      expect(item).toBe(navigationItem);
    });

    it("call with unknown route => return null", () => {
      const { findNavigationItemByRoute, navigationData } = useNavigationData();

      const navigationItem = createNavigationItem();

      navigationData.value = createNavigationData();

      navigationData.value.seoRouteMap[navigationItem.seoRoute] =
        navigationItem.id;
      navigationData.value.idMap[navigationItem.id] = navigationItem;

      const item = findNavigationItemByRoute("unknown-route");

      expect(item).toBe(null);
    });
  });
  describe("setNavigationData", () => {
    it("call with locale => set navigation data, add navigation data to cache", () => {
      const { setNavigationData, navigationData, cachedNavigationData } =
        useNavigationData();

      const navData = createNavigationData();
      const locale = navData.meta.identifier.languageId;

      expect(navigationData.value).toBeUndefined();
      expect(cachedNavigationData.value).toEqual({});

      setNavigationData(navData);

      expect(navigationData.value).toBe(navData);
      expect(cachedNavigationData.value[locale]).toEqual(navData);
    });
  });

  describe("fetchNavigationData", () => {
    it("navigation data cached => return cached data", async () => {
      const { fetchNavigationData, cachedNavigationData } = useNavigationData();

      const navData = createNavigationData();
      const locale = navData.meta.identifier.languageId;
      cachedNavigationData.value[locale] = navData;

      const returnVal = await fetchNavigationData(locale);

      expect(returnVal).toBe(navData);
    });

    it("navigation data not cached => fetch from api", async () => {
      const { fetchNavigationData } = useNavigationData();

      const returnVal = await fetchNavigationData("en_GB");

      expect(returnVal).toBe(navigationDataFixture);
    });
  });
});
