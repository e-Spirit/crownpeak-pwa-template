/**
 * @vitest-environment jsdom
 */
import { it, describe, beforeEach, vi, expect } from "vitest";
import { render, cleanup } from "@testing-library/vue";
import SlugPage from "../../pages/[...slug].vue";
import { createPage } from "../testutils/createPage";
import { renderConfig } from "../testutils/renderConfig";
import * as content from "../../composables/content";

describe("slug page", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("render with homepage layout prop => render homepage layout component", () => {
    vi.spyOn(content, "useContent").mockReturnValue({
      content: { value: createPage({ layout: "homepage" }) },
    });
    const { getByTestId } = render(SlugPage, { global: renderConfig.global });
    expect(getByTestId("homePageLayout")).toBeTruthy();
  });

  it("render with standard layout prop => render standard layout component", () => {
    vi.spyOn(content, "useContent").mockReturnValue({
      content: { value: createPage({ layout: "standard" }) },
    });
    const { getByTestId } = render(SlugPage, { global: renderConfig.global });
    expect(getByTestId("standardPageLayout")).toBeTruthy();
  });

  it("render with unkown layout prop => render unknown component", () => {
    vi.spyOn(content, "useContent").mockReturnValue({
      content: { value: createPage({ layout: "unkown" }) },
    });
    const { getByTestId } = render(SlugPage, { global: renderConfig.global });
    expect(getByTestId("unknown")).toBeTruthy();
  });
});
