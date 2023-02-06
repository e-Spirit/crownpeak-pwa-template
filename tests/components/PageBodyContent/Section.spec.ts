/**
 * @vitest-environment jsdom
 */
import { it, expect, describe, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/vue";
import Section from "../../../components/PageBodyContent/Section.vue";
import { createSection } from "../../testutils/createSection";
import { renderConfig } from "../../testutils/renderConfig"; // registers custom components

describe("Section", () => {
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
