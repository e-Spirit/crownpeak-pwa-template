/**
 * @vitest-environment jsdom
 */
import { it, describe, beforeEach, expect } from "vitest";
import { render, cleanup } from "@testing-library/vue";
import Home from "../../../components/PageLayout/Home.vue";
import { createPage } from "../../testutils/createPage";
import { createPageBody } from "../../testutils/createPageBody";
import { renderConfig } from "../../testutils/renderConfig";

describe("HomePageLayout", () => {
  beforeEach(() => {
    cleanup();
  });
  it("render with pageBody => render pageBody and Slider", () => {
    const page = createPage();
    const pageBody = createPageBody();
    page.children.push(pageBody);
    page.data.pt_slider = [];

    const { getByTestId } = render(Home, {
      global: renderConfig.global,
      props: { page },
    });

    // TODO: fix NuxtLayout

    expect(getByTestId("sliderSection")).toBeTruthy();
    expect(getByTestId("pageBody")).toBeTruthy();

    expect(getByTestId("layoutHeader")).toBeTruthy();
    expect(getByTestId("footer")).toBeTruthy();
    expect(getByTestId("navigation")).toBeTruthy();
    expect(getByTestId("languageSwitch")).toBeTruthy();
  });
});
