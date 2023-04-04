import { LogLevel } from 'fsxa-api'

export interface FSXAFileConfig {
  defaultLocale: string
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

export enum ServerErrors {
  MISSING_LOCALE = 'Please specify a locale in the body through: e.g. "locale": "de_DE" ',
  UNKNOWN_ROUTE = 'Could not map given route and method.',
  UNKNOWN = 'Unkown error'
}

// TODO: Routes not exported from FSXA Api
// will be solved when equivalent to the express integration  is implemented (TNG-1261)
export enum FSXAProxyRoutes {
  FETCH_ELEMENT_ROUTE = '/elements',
  FETCH_NAVIGATION_ROUTE = '/navigation',
  FETCH_BY_FILTER_ROUTE = '/filter',
  FETCH_PROPERTIES_ROUTE = '/properties',
  STREAM_CHANGE_EVENTS_ROUTE = '/change-stream'
}

// TODO: Errors not exported from FSXA Api
// will be solved when status codes ticket is implemented (TNG-1263)
export enum FSXAApiErrors {
  UNKNOWN_CONTENT_MODE = 'The content mode must be preview or release.',
  UNKNOWN_API_MODE = 'The api mode must be remote or proxy.',
  UNKNOWN_ERROR = 'An unknown error occured. Please check the logs for more information',
  UNKNOWN_REMOTE = 'The specified remote project was not found in the configuration. [remotes]',
  MISSING_BASE_URL = 'You do need to specify a baseUrl in proxy mode.',
  MISSING_API_KEY = 'No CaaS-ApiKey was passed via the configuration. [apiKey]',
  MISSING_CAAS_URL = 'No CaaS-URL was passed via the configuration. [caas]',
  MISSING_NAVIGATION_SERVICE_URL = 'No CaaS-URL was passed via the configuration. [navigationService]',
  MISSING_PROJECT_ID = 'No projectId was passed via the configuration. [projectId]',
  MISSING_TENANT_ID = 'No tenantId was passed via the configuration. [tenantId]',
  NOT_AUTHORIZED = 'Your passed ApiKey has no access to the requested resource',
  NOT_FOUND = 'Resource could not be found',
  MISSING_REMOTE_LOCALE = 'The specified remote project did not include a locale',
  MISSING_REMOTE_ID = 'The specified remote project did not include an id'
}
