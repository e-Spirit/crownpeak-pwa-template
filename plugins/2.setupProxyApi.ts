import { FSXAProxyApi } from "fsxa-api";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const appConfig = useAppConfig();
  const fsxaApi = new FSXAProxyApi(
    `${runtimeConfig.public.baseURL}/api`,
    runtimeConfig.public["logLevel"] || appConfig.logLevel
    // TODO: client access config
  );
  return {
    provide: {
      fsxaApi,
    },
  };
});
