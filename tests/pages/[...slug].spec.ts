/**
 * @vitest-environment jsdom
 */
import { it, describe, beforeEach, vi, expect } from "vitest";
import { render, cleanup } from "@testing-library/vue";
import { Page } from "fsxa-api";
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
    findCachedPageByRoute: (_route: string) => null,
    findCachedDatasetByRoute: (_route: string) => null,
    addToCachedPages: (_route: string, _page: Page) => null,
  };

  describe("page not cached", () => {
    it("render with homepage layout prop => render homepage layout component", async () => {
      vi.spyOn(content, "useContent").mockReturnValue({
        ...mockedContent,
        currentPage: { value: createPage({ layout: "homepage" }) },
      });
      const { getByTestId } = await render(SlugPage, {
        global: renderConfig.global,
      });

      expect(getByTestId("homePageLayout")).toBeTruthy();
    });

    it("render with standard layout prop => render standard layout component", () => {
      vi.spyOn(content, "useContent").mockReturnValue({
        ...mockedContent,
        currentPage: { value: createPage({ layout: "standard" }) },
      });
      const { getByTestId } = render(SlugPage, { global: renderConfig.global });
      expect(getByTestId("standardPageLayout")).toBeTruthy();
    });

    it("render with unknown layout prop => render unknown component", () => {
      vi.spyOn(content, "useContent").mockReturnValue({
        ...mockedContent,
        currentPage: { value: createPage({ layout: "unknown" }) },
      });
      const { getByTestId } = render(SlugPage, { global: renderConfig.global });
      expect(getByTestId("unknown")).toBeTruthy();
    });
  });

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

  // test cache
});
