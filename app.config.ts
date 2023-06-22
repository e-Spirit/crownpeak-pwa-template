import { LogLevel } from 'fsxa-api'
import { AppFileConfig } from './types'

const appConfig: AppFileConfig = {
  logLevel: LogLevel.WARNING,
  devMode: false,
  defaultLocale: 'de_DE',
  enableEventStream: false
}

export default defineAppConfig(appConfig)
