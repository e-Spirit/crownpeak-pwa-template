import { it, expect, describe } from "vitest";
import setupDataFetching from "../../plugins/3.setupDataFetching";
import { useLocale } from "../../composables/locale";
import { useNavigationData } from "../../composables/navigation";
import { useContent } from "../../composables/content";
import { useProjectProperties } from "../../composables/projectProperties";
import toplevelENnavData from "../fixtures/toplevelNavigation_en_GB.json";
import page from "../fixtures/page.json";
import projectPropertiesFixture from "../fixtures/projectProperties.json";

describe("setupDataFetching", () => {
  it("invoke without activeLocale and activNavItem => navdata, project props, content get fetched", async () => {
    const { config: localeConfig } = useLocale();
    const { activeNavigationItem, navigationData } = useNavigationData();
    const { content } = useContent();
    const { projectProperties } = useProjectProperties();
    expect(localeConfig.value.activeLocale).toBeUndefined();
    expect(activeNavigationItem.value).toBeUndefined();
    await setupDataFetching();

    expect(localeConfig.value.activeLocale).toBe("en_GB");
    expect(activeNavigationItem.value).toBe(
      toplevelENnavData.idMap["5a7cdf48-5031-4fcd-b6c7-99e802d0ce57"] // home page nav item
    );
    expect(navigationData.value).toBe(toplevelENnavData);
    expect(content.value).toBe(page);
    expect(projectProperties.value).toBe(projectPropertiesFixture);
  });
});

// setup watcher
// fetch content when watcher triggers

// Navigation state gets set
// activeLocale exists
// activeNavigationItem exists

// navdata exists
// pp exists
// content exists
