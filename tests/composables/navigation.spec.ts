import { it, expect, describe } from "vitest";
import { useNavigationData } from "../../composables/navigation";
import navigationItemFixture from "../fixtures/navigationItem.json";

describe("useNavigationData", () => {
  it("useNavigationData => provide undefined default navigationData", () => {
    const { navigationData } = useNavigationData();

    expect(navigationData.value).toBeUndefined();
  });

  it("setActiveNavigationItem => set the active navigation item", () => {
    const { setActiveNavigationItem, activeNavigationItem } =
      useNavigationData();

    setActiveNavigationItem(navigationItemFixture);

    expect(activeNavigationItem.value).toStrictEqual(navigationItemFixture);
  });

  it("getIndexRoute => return the index route", async () => {
    const { getIndexRoute } = useNavigationData();

    expect(await getIndexRoute()).toEqual("/Startseite/");
  });

  it("getIndexRoute => fetch navigation data if it does not exist", async () => {
    const { getIndexRoute, navigationData } = useNavigationData();

    expect(navigationData.value).toBeUndefined();

    expect(await getIndexRoute()).toEqual("/Startseite/");

    expect(navigationData.value).not.toBeUndefined();
  });
});
