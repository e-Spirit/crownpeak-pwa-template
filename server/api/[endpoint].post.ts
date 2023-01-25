import { FSXAApiSingleton } from "fsxa-api";

export default defineEventHandler(async (event) => {
  const remoteApi = FSXAApiSingleton.instance; // throws error if undefined

  const body = await readBody(event);
  const { endpoint } = event.context["params"];

  switch (endpoint) {
    // call an /api/elements
    case "elements":
      return remoteApi.fetchElement(body);
    case "filter":
      return remoteApi.fetchByFilter(body);
    case "navigation":
      return remoteApi.fetchNavigation(body);
    case "properties":
      return remoteApi.fetchProjectProperties(body);
    default:
      throw new Error("Unknown endpoint");
  }
});
