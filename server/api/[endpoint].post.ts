import { FSXARemoteApi, FSXAContentMode, LogLevel } from "fsxa-api";
import { FSXAConfig } from "~~/types";

let remoteApi: FSXARemoteApi;

export default defineEventHandler(async (event) => {
  if (!remoteApi) {
    const runtimeConfig = useRuntimeConfig();
    const fsxaConfig: { value: FSXAConfig } = {
      value: {
        logLevel: LogLevel.NONE,
        devMode: false,
        enableEventStream: false,
        defaultLocale: "de_DE",
      },
    };

    remoteApi = new FSXARemoteApi({
      apikey: runtimeConfig.private.fsxaApiKey,
      caasURL: runtimeConfig.private.fsxaCaas,
      navigationServiceURL: runtimeConfig.private.fsxaNavigationService,
      tenantID: runtimeConfig.private.fsxaTenantId,
      maxReferenceDepth: fsxaConfig.value.maxReferenceDepth,
      projectID: runtimeConfig.private.fsxaProjectId,
      contentMode: runtimeConfig.private.fsxaMode as FSXAContentMode,
      // TODO:
      // filterOptions: {
      //   navigationItemFilter: serverAccessControlConfig?.navigationItemFilter,
      //   caasItemFilter: serverAccessControlConfig?.caasItemFilter,
      // },
      logLevel: fsxaConfig.value.logLevel,
    });
  }
  const body = await readBody(event);
  const { endpoint } = event.context["params"];

  switch (endpoint) {
    case "elements":
      return remoteApi.fetchElement(body);
    case "filter":
      return await remoteApi.fetchByFilter(body);
    case "navigation":
      return remoteApi.fetchNavigation(body);
    case "properties":
      return remoteApi.fetchProjectProperties(body);
    default:
      throw new Error("Unknown endpoint");
  }
});
