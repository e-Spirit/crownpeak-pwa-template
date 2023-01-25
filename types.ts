import { LogLevel } from "fsxa-api/dist/types";

export interface FSXAConfig {
  logLevel: LogLevel;
  devMode: boolean;
  enableEventStream: boolean;
  defaultLocale: string;
  fsxaSnapUrl?: string;
  maxReferenceDepth?: number;
  pathToServerAccessControlConfig?: string; // EXPERIMENTAL optional path to file that exports server access control
  pathToClientAccessControlConfig?: string; // EXPERIMENTAL optional path to file that exports client access conrtol
}

export interface FSXAFileConfig extends Partial<FSXAConfig> {}

export enum ServerErrors {
  MISSING_LOCALE = 'Please specify a locale in the body through: e.g. "locale": "de_DE" ',
  UNKNOWN_ROUTE = "Could not map given route and method.",
  UNKNOWN = "Unkown error",
}
