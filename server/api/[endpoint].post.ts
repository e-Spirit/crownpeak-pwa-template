import { FSXARemoteApi, FSXAContentMode } from "fsxa-api";

let remoteApi: FSXARemoteApi;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { endpoint } = event.context["params"];

  if (!remoteApi) {
    const {
      private: {
        fsxaApiKey,
        fsxaMode,
        fsxaProjectId,
        fsxaNavigationService,
        fsxaRemotes,
        fsxaCaas,
        fsxaTenantId,
        fsxaMaxReferenceDepth,
      },
    } = useRuntimeConfig();

    const defaultOptions = {
      maxReferenceDepth: 20,
      logLevel: 0,
    };
    const options = defaultOptions;

    //   const serverAccessControlConfig = {
    //     navigationItemFilter: () => {},
    //     caasItemFilter: () => {},
    //   };

    remoteApi = new FSXARemoteApi({
      apikey: fsxaApiKey,
      caasURL: fsxaCaas,
      navigationServiceURL: fsxaNavigationService,
      tenantID: fsxaTenantId,
      maxReferenceDepth:
        Number(fsxaMaxReferenceDepth) || options.maxReferenceDepth,
      projectID: fsxaProjectId,
      remotes: JSON.parse(fsxaRemotes) || {},
      contentMode: fsxaMode as FSXAContentMode,
      // filterOptions: {
      //   navigationItemFilter: serverAccessControlConfig?.navigationItemFilter,
      //   caasItemFilter: serverAccessControlConfig?.caasItemFilter,
      // },
      logLevel: options.logLevel,
    });
  }

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
