/* eslint no-console: 0 */
// TODO: the logger should be exported from the fsxa api in a future ticket (TNG-1289)
import { inspect } from 'util'
import chalk from 'chalk'
import { LogLevel } from 'fsxa-api'

const getCircularReplacer = () => {
  const seen = new WeakMap()
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        const representation = []
        const firstSeen = seen.get(value)
        if (firstSeen) representation.push(`first occurence: ${firstSeen}`)
        if (value.type) representation.push(`type: ${value.type}`)
        if (value.id) representation.push(`id: ${value.id}`)
        return `[~circle. ${representation.join(', ')}]`
      }
      seen.set(value, key)
    }
    return value
  }
}

const formatOutput = (...args: any[]) => {
  args = args.map((entry) => {
    if (typeof entry === 'object') {
      return JSON.stringify(entry, getCircularReplacer())
    }
    return entry
  })

  return inspect(args.join(' | '), {
    showHidden: false,
    depth: null,
    colors: false,
    compact: true,
    breakLength: Infinity
  }).replace(/'/g, '')
}

class Logger {
  private _logLevel: LogLevel
  private _name: string

  constructor(logLevel: LogLevel, name: string) {
    this._logLevel = logLevel
    this._name = name
  }

  get logLevel() {
    return this._logLevel
  }

  debug(...args: any[]) {
    if (this._logLevel <= LogLevel.DEBUG) {
      console.info(
        chalk.gray(
          `${chalk.bgWhite.black(' DEBUG ')} ${this._name} | ${formatOutput(
            ...args
          )}`
        )
      )
    }
  }

  log(...args: any[]) {
    this.info(args)
  }

  info(...args: any[]) {
    if (this._logLevel <= LogLevel.INFO) {
      console.info(
        chalk.blue(
          `${chalk.bgBlue.white(' INFO ')} ${this._name} | ${formatOutput(
            ...args
          )}`
        )
      )
    }
  }

  warn(...args: any[]) {
    if (this._logLevel <= LogLevel.WARNING) {
      console.warn(
        chalk.yellow(
          `${chalk.bgYellow.black(' WARN ')} ${this._name} | ${formatOutput(
            ...args
          )}`
        )
      )
    }
  }

  error(...args: any[]) {
    if (this._logLevel <= LogLevel.ERROR) {
      console.error(
        chalk.red(
          `${chalk.bgRed.black(' ERROR ')} ${this._name} | ${formatOutput(
            ...args
          )}`
        )
      )
    }
  }
}

export default defineNuxtPlugin(() => {
  const { logLevel: logLevelFileConfig } = useAppConfig()
  const {
    public: { logLevel: logLevelEnv }
  } = useRuntimeConfig()

  const logLevel = Number(logLevelEnv) || logLevelFileConfig || LogLevel.NONE

  const logger = new Logger(logLevel, 'fsxa-nuxt3-pwa')
  return {
    provide: {
      logger
    }
  }
})
