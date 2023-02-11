import { it, expect, describe } from "vitest";
import setupDataFetching from "../../plugins/4.setupDataFetching";
import { useLocale } from "../../composables/locale";
import { useNavigationData } from "../../composables/navigation";
import { useContent } from "../../composables/content";
import { useProjectProperties } from "../../composables/projectProperties";
import toplevelENnavData from "../fixtures/toplevelNavigation_en_GB.json";
import page from "../fixtures/page.json";
import projectPropertiesFixture from "../fixtures/projectProperties.json";

describe("setupDataFetching", () => {
  it("setupDataFetching => navdata, project props, content get fetched", async () => {
    const { setLocale } = useLocale();
    const { navigationData, setActiveNavigationItem } = useNavigationData();
    const { content } = useContent();
    const { projectProperties } = useProjectProperties();
    setLocale("en_GB");

    // TODO:
    // type mismatch: NavigationData type expects 'denied' attribute
    // in permissions while in data from navigation service the attribute is
    // called 'forbidden'
    setActiveNavigationItem(
      toplevelENnavData.idMap["5a7cdf48-5031-4fcd-b6c7-99e802d0ce57"]
    );
    await setupDataFetching();

    expect(navigationData.value).toBe(toplevelENnavData);
    expect(content.value).toBe(page);
    expect(projectProperties.value).toBe(projectPropertiesFixture);
  });
});
