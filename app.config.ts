import { LogLevel } from "fsxa-api";
import { FSXAConfig } from "./types";

const fsxaConfig: FSXAConfig = {
  logLevel: LogLevel.DEBUG,
  devMode: false,
  defaultLocale: "de_DE",
  enableEventStream: false,
};

export default defineAppConfig(fsxaConfig);
