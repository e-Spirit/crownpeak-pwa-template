/**
 * @vitest-environment jsdom
 */
import { it, describe, beforeEach, expect } from "vitest";
import { render, cleanup } from "@testing-library/vue";
import Standard from "../../../components/PageLayout/Standard.vue";
import { createPage } from "../../testutils/createPage";
import { renderConfig } from "../../testutils/renderConfig";

describe("StandardPageLayout", () => {
  beforeEach(() => {
    cleanup();
  });
  it.skip("render with pageBody => render pageBody and Header", () => {
    const page = createPage();
    const { getByTestId } = render(Standard, {
      global: renderConfig.global,
      props: { page },
    });

    // TODO: fix NuxtLayout

    expect(getByTestId("headerSection")).toBeTruthy();
    expect(getByTestId("pageBody")).toBeTruthy();
  });
});
