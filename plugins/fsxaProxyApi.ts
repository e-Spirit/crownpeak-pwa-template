import { FSXAProxyApi } from "fsxa-api";

export default defineNuxtPlugin(() => {
  const {
    public: { baseUrl },
  } = useRuntimeConfig();
  const { fsxaConfig } = useFSXAConfig();
  const fsxaApi = new FSXAProxyApi(
    `${baseUrl}/api`,
    fsxaConfig.value.logLevel
    // TODO: client access config
  );
  return {
    provide: {
      fsxaApi,
    },
  };
});
