/**
 * @vitest-environment jsdom
 */
import { Page, Dataset } from "fsxa-api";
import { vi, it, expect, describe, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/vue";
import Section from "../../../components/PageBodyContent/Section.vue";
import { createDataset } from "../../testutils/createDataset";
import { createSection } from "../../testutils/createSection";
import { createPage } from "../../testutils/createPage";
import { renderConfig } from "../../testutils/renderConfig"; // registers custom components
import * as content from "../../../composables/content";

describe("Section", () => {
  const mockedContent = {
    currentPage: { value: createPage({ layout: "homepage" }) },
    currentDataset: { value: createDataset() },
    cachedPages: {},
    cachedDatasets: {},
    findCachedPageByRoute: (_route: string) => null,
    findCachedDatasetByRoute: (_route: string) => null,
    addToCachedPages: (_route: string, _page: Page) => null,
    addToCachedDatasets: (_route: string, _dataset: Dataset) => null,
  };

  beforeEach(() => {
    cleanup();
  });

  it("render with section type interesting_facts=> render InterestingFacts component with preview id attribute", () => {
    const section = createSection({ sectionType: "interesting_facts" });
    const { getByTestId } = render(Section, {
      global: renderConfig.global,
      props: { content: section },
    });

    expect(getByTestId("interestingFactsSection")).toBeTruthy();
    expect(
      getByTestId("interestingFactsSection").getAttribute("data-preview-id")
    ).toStrictEqual(section.previewId);
  });

  it("render with section type products.category_products=> render ProductCategory component with preview id attribute", () => {
    const section = createSection({
      sectionType: "products.category_products",
    });
    const { getByTestId } = render(Section, {
      global: renderConfig.global,
      props: { content: section },
    });
    expect(getByTestId("productCategorySection")).toBeTruthy();
    expect(
      getByTestId("productCategorySection").getAttribute("data-preview-id")
    ).toStrictEqual(section.previewId);
  });

  it("render with section type products.product=> render Product component with preview id attribute", () => {
    const section = createSection({
      sectionType: "products.product",
    });

    vi.spyOn(content, "useContent").mockReturnValue({
      ...mockedContent,
      currentDataset: createDataset(),
    });

    const { getByTestId } = render(Section, {
      global: renderConfig.global,
      props: { content: section },
    });
    expect(getByTestId("productSection")).toBeTruthy();
    expect(
      getByTestId("productSection").getAttribute("data-preview-id")
    ).toStrictEqual(section.previewId);
  });

  it("render with unknwon section type products.product=> render Unknown component", () => {
    const section = createSection({
      sectionType: "unknwon",
    });
    const { getByTestId } = render(Section, {
      global: renderConfig.global,
      props: { content: section },
    });
    expect(getByTestId("unknown")).toBeTruthy();
  });
});
