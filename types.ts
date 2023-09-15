export enum ServerErrors {
  MISSING_LOCALE = 'Please specify a locale in the body through: e.g. "locale": "de_DE" ',
  UNKNOWN_ROUTE = 'Could not map given route and method.',
  UNKNOWN = 'Unkown error'
}

export type LegalLink = {
  name: string
  route: string
}
