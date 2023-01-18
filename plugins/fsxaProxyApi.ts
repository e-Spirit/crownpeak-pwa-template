import { FSXAProxyApi } from "fsxa-api";

export default defineNuxtPlugin(() => {
  const {
    public: { baseUrl },
  } = useRuntimeConfig();

  const fsxaApi = new FSXAProxyApi(`${baseUrl}/api`);

  return {
    provide: {
      fsxaApi,
    },
  };
});
