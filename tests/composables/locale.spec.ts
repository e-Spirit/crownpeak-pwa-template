import { it, expect, describe } from "vitest";
import { useLocale } from "../../composables/locale";

describe("useLocale", () => {
  it("useLocale => provide default config", () => {
    const { config, activeLocale } = useLocale();

    expect(config.value).toEqual(
      expect.objectContaining({
        defaultLocale: "de_DE",
        allLocales: [
          { name: "Deutsch", identifier: "de_DE" },
          { name: "English", identifier: "en_GB" },
        ],
      })
    );
    expect(activeLocale.value).toBeUndefined();
  });

  it("setActiveLocale => set activeLocale in config", () => {
    const { config, setActiveLocale, activeLocale } = useLocale();

    setActiveLocale("en_GB");

    expect(config.value).toEqual(
      expect.objectContaining({
        defaultLocale: "de_DE",
        allLocales: [
          { name: "Deutsch", identifier: "de_DE" },
          { name: "English", identifier: "en_GB" },
        ],
      })
    );
    expect(activeLocale.value).toBe("en_GB");
  });
});
