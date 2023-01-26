import {
  FSXAApiSingleton,
  FSXARemoteApi,
  FSXARemoteApiConfig,
  FSXAContentMode,
  LogLevel,
} from "fsxa-api";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig(); // .env
  const appConfig = useAppConfig(); // app.config.ts

  const remoteApiConfig: FSXARemoteApiConfig = {
    apikey: runtimeConfig.private.apiKey,
    caasURL: runtimeConfig.private.caas,
    navigationServiceURL: runtimeConfig.private.navigationService,
    tenantID: runtimeConfig.private.tenantId,
    maxReferenceDepth:
      runtimeConfig.private["maxReferenceDepth"] || appConfig.maxReferenceDepth,
    projectID: runtimeConfig.private.projectId,
    remotes: runtimeConfig.private.remotes
      ? JSON.parse(runtimeConfig.private.remotes)
      : {},
    contentMode: runtimeConfig.private.mode as FSXAContentMode,
    // TODO:
    // filterOptions: {
    //   navigationItemFilter: serverAccessControlConfig?.navigationItemFilter,
    //   caasItemFilter: serverAccessControlConfig?.caasItemFilter,
    // },
    logLevel:
      Number.parseInt(runtimeConfig.public["logLevel"]) ||
      appConfig.logLevel ||
      LogLevel.NONE,
  };

  FSXAApiSingleton.init(new FSXARemoteApi(remoteApiConfig));
});
