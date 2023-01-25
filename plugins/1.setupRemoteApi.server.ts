import {
  FSXAApiSingleton,
  FSXARemoteApi,
  FSXARemoteApiConfig,
  FSXAContentMode,
} from "fsxa-api";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig(); // .env
  const appConfig = useAppConfig(); // app.config.ts

  const remoteApiConfig: FSXARemoteApiConfig = {
    apikey: runtimeConfig.private.fsxaApiKey,
    caasURL: runtimeConfig.private.fsxaCaas,
    navigationServiceURL: runtimeConfig.private.fsxaNavigationService,
    tenantID: runtimeConfig.private.fsxaTenantId,
    maxReferenceDepth: appConfig.maxReferenceDepth,
    projectID: runtimeConfig.private.fsxaProjectId,
    remotes: runtimeConfig.private.fsxaRemotes
      ? JSON.parse(runtimeConfig.private.fsxaRemotes)
      : {},
    contentMode: runtimeConfig.private.fsxaMode as FSXAContentMode,
    // TODO:
    // filterOptions: {
    //   navigationItemFilter: serverAccessControlConfig?.navigationItemFilter,
    //   caasItemFilter: serverAccessControlConfig?.caasItemFilter,
    // },
    logLevel: appConfig.logLevel,
  };

  FSXAApiSingleton.init(new FSXARemoteApi(remoteApiConfig));
});
