import { it, expect, describe } from "vitest";
import { useLocale } from "../../composables/locale";

describe("useLocale", () => {
  it("useLocale => provide default config", () => {
    const { config } = useLocale();

    expect(config.value).toEqual(
      expect.objectContaining({
        activeLocale: undefined,
        defaultLocale: "de_DE",
        allLocales: [
          { name: "Deutsch", identifier: "de_DE" },
          { name: "English", identifier: "en_GB" },
        ],
      })
    );
  });

  it("setActiveLocale => set activeLocale in config", () => {
    const { config, setActiveLocale } = useLocale();

    setActiveLocale("en_GB");

    expect(config.value).toEqual(
      expect.objectContaining({
        activeLocale: "en_GB",
        defaultLocale: "de_DE",
        allLocales: [
          { name: "Deutsch", identifier: "de_DE" },
          { name: "English", identifier: "en_GB" },
        ],
      })
    );
  });
});
