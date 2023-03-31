/**
 * @vitest-environment jsdom
 */
import { it, describe, beforeEach, vi, expect } from "vitest";
import { render, cleanup } from "@testing-library/vue";
import { Dataset, Page } from "fsxa-api";
import SlugPage from "../../pages/[...slug].vue";
import { createPage } from "../testutils/createPage";
import { renderConfig } from "../testutils/renderConfig";
import * as content from "../../composables/content";
import { clearMockedState } from "../testutils/nuxtMocks";
import { useNavigationData } from "../../composables/navigation";
import { createNavigationItem } from "../testutils/createNavigationItem";
import { createDataset } from "../testutils/createDataset";
import { useLocale } from "../../composables/locale";

describe("slug page", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    clearMockedState();
    const navItem = createNavigationItem();
    const { setActiveLocale } = useLocale();
    const { setActiveNavigationItem } = useNavigationData();
    setActiveNavigationItem(navItem);
    setActiveLocale("de_DE");
  });
  const mockedContent = {
    currentPage: { value: createPage({ layout: "homepage" }) },
    currentDataset: { value: createDataset() },
    cachedPages: {},
    cachedDatasets: {},
    cachedProducts: [],
    addToCachedProducts: (_route: string, _data: Dataset[]) => null,
    findCachedProductsByRoute: (_route: string) => null,
    findCachedPageByRoute: (_route: string) => null,
    findCachedDatasetByRoute: (_route: string) => null,
    addToCachedPages: (_route: string, _page: Page) => null,
    addToCachedDatasets: (_route: string, _dataset: Dataset) => null,
  };

  describe("page cached", () => {
    it("render => display cached component", () => {
      vi.spyOn(content, "useContent").mockReturnValue({
        ...mockedContent,
        findCachedPageByRoute: (_route: string) =>
          createPage({ layout: "standard" }),
      });
      const { getByTestId } = render(SlugPage, { global: renderConfig.global });
      expect(getByTestId("standardPageLayout")).toBeTruthy();
    });
  });
});
