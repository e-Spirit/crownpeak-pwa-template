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

  it("setLocale => set activeLocale in config", () => {
    const { config, setLocale } = useLocale();

    setLocale("en_GB");

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
