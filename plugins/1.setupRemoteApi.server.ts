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

  const { showDev } = useDev();
  showDev.value =
    appConfig?.devMode || runtimeConfig?.private?.devMode === "true";

  const remoteApiConfig: FSXARemoteApiConfig = {
    apikey: runtimeConfig.private.apiKey,
    caasURL: runtimeConfig.private.caas,
    navigationServiceURL: runtimeConfig.private.navigationService,
    tenantID: runtimeConfig.private.tenantId,
    maxReferenceDepth:
      parseInt(runtimeConfig.private["maxReferenceDepth"]) ||
      appConfig.maxReferenceDepth,
    projectID: runtimeConfig.private.projectId,
    remotes: runtimeConfig.private.remotes
      ? typeof runtimeConfig.private.remotes === "string"
        ? JSON.parse(runtimeConfig.private.remotes)
        : runtimeConfig.private.remotes
      : {},
    contentMode: runtimeConfig.public.mode as FSXAContentMode,
    // TODO:
    // server access config
    logLevel:
      Number.parseInt(runtimeConfig.public["logLevel"]) ||
      appConfig.logLevel ||
      LogLevel.NONE,
    enableEventStream:
      !!runtimeConfig.public["enableEventStream"] ||
      appConfig.enableEventStream ||
      false,
  };

  FSXAApiSingleton.init(new FSXARemoteApi(remoteApiConfig));
});
