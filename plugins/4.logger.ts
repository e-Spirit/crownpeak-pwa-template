import { LogLevel, Logger } from 'fsxa-api'

export default defineNuxtPlugin(() => {
  const { logLevel: logLevelFileConfig } = useAppConfig()
  const {
    public: { logLevel: logLevelEnv }
  } = useRuntimeConfig()

  const logLevel = Number(logLevelEnv) || logLevelFileConfig || LogLevel.NONE

  const logger = new Logger(logLevel, 'crownpeak-pwa-template')
  return {
    provide: {
      logger
    }
  }
})
