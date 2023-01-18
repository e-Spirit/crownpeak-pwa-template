import { FSXARemoteApi, FSXAContentMode } from "fsxa-api";

let remoteApi: FSXARemoteApi;

export default defineEventHandler(async (event) => {
  if (!remoteApi) {
    const runtimeConfig = useRuntimeConfig();
    const { fsxaConfig } = useFSXAConfig();
    remoteApi = new FSXARemoteApi({
      apikey: runtimeConfig.private.fsxaApiKey,
      caasURL: runtimeConfig.private.fsxaCaas,
      navigationServiceURL: runtimeConfig.private.fsxaNavigationService,
      tenantID: runtimeConfig.private.fsxaTenantId,
      maxReferenceDepth: fsxaConfig.value.maxReferenceDepth,
      projectID: runtimeConfig.private.fsxaProjectId,
      remotes: JSON.parse(runtimeConfig.private.fsxaRemotes) || {},
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
      return await remoteApi.fetchElement(body);
    case "filter":
      return await remoteApi.fetchByFilter(body);
    case "navigation":
      return await remoteApi.fetchNavigation(body);
    case "properties":
      return await remoteApi.fetchProjectProperties(body);
    default:
      throw new Error("Unknown endpoint");
  }
});
