import { it, expect, describe, vi, beforeEach } from "vitest";
import determineNavigationState from "../../plugins/3.determineNavigationState";
import * as nuxtMocks from "../testutils/nuxtMocks";
import toplevelDEnavData from "../fixtures/toplevelNavigation_de_DE.json";
import toplevelENnavData from "../fixtures/toplevelNavigation_en_GB.json";
import { useNavigationData } from "../../composables/navigation";
import { useLocale } from "../../composables/locale";

describe("determineNavigationState", () => {
  beforeEach(() => {
    nuxtMocks.clearMockedState();
  });
  it("route is / => don't figure out navigation state but navigate to index route", async () => {
    const { activeNavigationItem } = useNavigationData();
    const { config: localeConfig } = useLocale();
    const mockedIndexRoute = {
      path: "/",
      query: "myQuery",
      hash: "myHash",
      fullPath: "/?myQuery#myHash",
    };
    vi.spyOn(nuxtMocks, "useRoute").mockImplementation(() => mockedIndexRoute);
    const navigateToSpy = vi.spyOn(nuxtMocks, "navigateTo");
    await determineNavigationState();
    expect(navigateToSpy).toHaveBeenCalledWith({
      path: toplevelDEnavData.pages.index,
      query: mockedIndexRoute.query,
      hash: mockedIndexRoute.hash,
    });
    expect(activeNavigationItem.value).toBeUndefined();
    expect(localeConfig.value.activeLocale).toBeUndefined();
  });

  it("route is not /, active locale and navigation item do not exist => determine locale and navigation item", async () => {
    const { activeNavigationItem } = useNavigationData();
    const { config: localeConfig } = useLocale();
    const navItem =
      toplevelENnavData.idMap["aa684dc6-2220-4d71-b468-f3e056b0c4f0"];

    const mockedRoute = {
      path: navItem.seoRoute,
      query: "myQuery",
      hash: "myHash",
      fullPath: navItem.seoRoute + "?myQuery#myHash",
    };

    vi.spyOn(nuxtMocks, "useRoute").mockImplementation(() => mockedRoute);

    expect(activeNavigationItem.value).toBeUndefined();
    expect(localeConfig.value.activeLocale).toBeUndefined();
    await determineNavigationState();
    expect(activeNavigationItem.value).toBe(navItem);
    expect(localeConfig.value.activeLocale).toBe("en_GB");
  });

  it("navigation item cannot be determined => throw 404", async () => {
    const mockedRoute = {
      path: "someUnknownRoute",
      query: "myQuery",
      hash: "myHash",
      fullPath: "someUnknownRoute" + "?myQuery#myHash",
    };
    vi.spyOn(nuxtMocks, "useRoute").mockImplementation(() => mockedRoute);
    const createErrorSpy = vi.spyOn(nuxtMocks, "createError");

    try {
      await determineNavigationState();
    } catch (error) {}
    expect(createErrorSpy).toHaveBeenCalledOnce();
    expect(createErrorSpy).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 404 })
    );
  });
});
