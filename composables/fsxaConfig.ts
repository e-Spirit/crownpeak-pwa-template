import { LogLevel } from "fsxa-api";
import { FSXAConfig, FSXAFileConfig } from "~~/types";

const defaultConfig: FSXAConfig = {
  logLevel: LogLevel.NONE,
  devMode: false,
  enableEventStream: false,
  defaultLocale: "de_DE",
};

export function useFSXAConfig() {
  const fsxaConfig = useState<FSXAConfig>("fsxaConfig", () => defaultConfig);
  function mergeFSXAConfig(config: FSXAFileConfig) {
    // TODO: cleanup
    // remove empty keys
    const filteredConfig: any = {};
    for (const [key, value] of Object.entries(config)) {
      if (value !== undefined) filteredConfig[key] = value;
    }
    fsxaConfig.value = {
      ...fsxaConfig.value,
      ...filteredConfig,
    };
  }

  return {
    fsxaConfig,
    mergeFSXAConfig,
  };
}
