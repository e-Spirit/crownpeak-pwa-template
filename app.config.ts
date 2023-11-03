import { LogLevel } from 'fsxa-api'
declare module 'nuxt/schema' {
  interface AppConfig {
    defaultLocale?: string
    logLevel?: LogLevel
    devMode?: boolean
    contentMode?: 'preview' | 'release'
    snapUrl?: string
    maxReferenceDepth?: number
    remotes?: Record<
      string,
      {
        id: string
        locale: string
      }
    >
    enableEventStream?: boolean
    pathToServerAccessControlConfig?: string // EXPERIMENTAL optional path to file that exports server access control
    pathToClientAccessControlConfig?: string // EXPERIMENTAL optional path to file that exports client access conrtol
  }
}

export default defineAppConfig({
  logLevel: LogLevel.WARNING,
  devMode: true,
  defaultLocale: 'de_DE',
  enableEventStream: false
})
