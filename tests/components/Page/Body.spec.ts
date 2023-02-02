/**
 * @vitest-environment jsdom
 */
import { it, expect } from "vitest";
import { render } from "@testing-library/vue";
import PageBody from "../../../components/Page/Body.vue";
import { createPageBody } from "../../testutils/PageBody";
import { createSection } from "../../testutils/Section";
import { createDataset } from "../../testutils/Dataset";
import { createContent2Section } from "../../testutils/Content2Section";

it("render pageBody => render page body children", () => {
  const section = createSection();
  const dataset = createDataset();
  const content2Section = createContent2Section();

  const pageBody = createPageBody({
    children: [section, dataset, content2Section],
  });

  const { getAllByTestId } = render(PageBody, {
    props: { pageBody },
  });

  const pageBodyChildren = getAllByTestId("pageBodyChild");

  expect(pageBodyChildren.length).toBe(3);
});

// has data preview id

//
