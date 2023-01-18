import fs from "fs";
import { FSXAFileConfig } from "~~/types";

export default defineNuxtPlugin(() => {
  const { mergeFSXAConfig } = useFSXAConfig();

  // load fsxa.config file
  if (fs.existsSync("fsxa.config.json")) {
    const fsxaFileConfig: FSXAFileConfig = require("../fsxa.config.json");
    mergeFSXAConfig({ ...fsxaFileConfig });
  }

  // merge runtime config
  const {
    public: { fsxaLogLevel, fsxaMaxReferenceDepth },
  } = useRuntimeConfig();
  mergeFSXAConfig({
    logLevel: Number.parseInt(fsxaLogLevel),
    maxReferenceDepth: Number.parseInt(fsxaMaxReferenceDepth),
  } as FSXAFileConfig);
});
