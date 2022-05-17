interface Config {
  SENTRY_ORGANIZATION: string;
  SENTRY_PROJECT: string;
  SENTRY_AUTH_TOKEN: string;
  ios: any;
  android: any;
}
export function appConfig(): Config;
