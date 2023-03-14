import { FSXAContentMode, FSXAProxyApi, LogLevel } from "fsxa-api";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const appConfig = useAppConfig();
  const url = new URL("/api", runtimeConfig.public["baseURL"]).href;
  const fsxaApi = new FSXAProxyApi(
    url,
    Number.parseInt(runtimeConfig.public["logLevel"]) ||
      appConfig.logLevel ||
      LogLevel.NONE
    // TODO: client access config
  );
  return {
    provide: {
      fsxaApi,
      isPreviewMode: runtimeConfig.public.mode === FSXAContentMode.PREVIEW,
    },
  };
});
