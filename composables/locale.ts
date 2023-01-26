type LocaleConfig = {
  activeLocale: string | undefined;
  defaultLocale: string;
  allLocales: string[];
};

const defaultConfig: LocaleConfig = {
  activeLocale: undefined,
  defaultLocale: "de_DE",
  allLocales: ["de_DE", "en_GB"],
};

export function useLocale() {
  const config = useState<LocaleConfig>("localeConfig", () => defaultConfig);

  const { $fsxaApi } = useNuxtApp();

  return {
    config,
    setLocale: (activeLocale: string) => {
      config.value = { ...config.value, activeLocale };
    },
    getLocaleFromPath: async (path: string) => {
      const data = await $fsxaApi.fetchNavigation({
        initialPath: path,
        locale: "",
      });
      if (!data) return;

      const firstIdMapEntry = Object.values(data.idMap)[0];
      if (!firstIdMapEntry) return;

      const contentRefLocale = firstIdMapEntry.contentReference
        ?.split(".")
        .pop();

      if (!contentRefLocale) return;

      config.value = { ...config.value, activeLocale: contentRefLocale };
    },
  };
}
