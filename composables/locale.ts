type LocaleConfig = {
  activeLocale: string | undefined; // undefined if the user has not selected a locale yet or we have not extracted the locale from the deeplink
  defaultLocale: string;
  allLocales: string[];
};

// TODO: Implement this function however you want
// You might want to use the CaaS to get all available locales
const getAllLocales = () => ["de_DE", "en_GB"];

const defaultConfig: LocaleConfig = {
  activeLocale: undefined,
  defaultLocale: "de_DE",
  allLocales: getAllLocales(),
};

export function useLocale() {
  const config = useState<LocaleConfig>("localeConfig", () => defaultConfig);

  return {
    config,
    // This gets called when:
    // 1. the user changes the locale or
    // 2. the user opens a deeplink and we extract the locale from the navigation data
    setLocale: (activeLocale: string) => {
      config.value = { ...config.value, activeLocale };
    },
  };
}
