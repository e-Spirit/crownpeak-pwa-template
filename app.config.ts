import { LogLevel } from "fsxa-api";
import { FSXAFileConfig } from "./types";

const fsxaConfig: FSXAFileConfig = {
  logLevel: LogLevel.WARNING,
  devMode: false,
  defaultLocale: "de_DE",
  enableEventStream: false,
};

export default defineAppConfig(fsxaConfig);
