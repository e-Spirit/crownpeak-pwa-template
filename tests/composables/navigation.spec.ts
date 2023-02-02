import { it, expect, describe } from "vitest";
import { useNavigationData } from "../../composables/navigation";
import navigationItemFixture from "../fixtures/navigationItem.json";

describe("useNavigationData", () => {
  it("useNavigationData => provide default config", () => {
    const { navigationData } = useNavigationData();

    expect(navigationData.value).toBeUndefined();
  });

  it("setActiveNavigationItem should set the active navigation item", () => {
    const { setActiveNavigationItem, navigationItem } = useNavigationData();

    setActiveNavigationItem(navigationItemFixture);

    expect(navigationItem.value).toStrictEqual(navigationItemFixture);
  });

  it("getIndexRoute should return the index route", async () => {
    const { getIndexRoute } = useNavigationData();

    expect(await getIndexRoute()).toEqual("/Startseite/");
  });

  it("getIndexRoute should work without active locale", async () => {
    const { getIndexRoute } = useNavigationData();

    expect(await getIndexRoute()).toEqual("/Startseite/");
  });

  it("getIndexRoute should fetch navigation data if it does not exist", async () => {
    const { getIndexRoute, navigationData } = useNavigationData();

    expect(navigationData.value).toBeUndefined();

    expect(await getIndexRoute()).toEqual("/Startseite/");

    expect(navigationData.value).not.toBeUndefined();
  });
});
