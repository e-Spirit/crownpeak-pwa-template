import { LogLevel } from "fsxa-api";
import { FSXAFileConfig } from "./types";

const fsxaConfig: FSXAFileConfig = {
  logLevel: LogLevel.NONE,
  devMode: true,
  defaultLocale: "de_DE",
  enableEventStream: false,
};

export default defineAppConfig(fsxaConfig);
