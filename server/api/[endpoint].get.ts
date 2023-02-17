// import { FSXAApiSingleton } from "fsxa-api";

import { ServerErrors, FSXAProxyRoutes } from "~/types";

export default defineEventHandler((event) => {
  // const remoteApi = FSXAApiSingleton.instance; // throws error if undefined
  const endpoint = event.context["params"]?.["endpoint"];
  if (`/${endpoint}` === FSXAProxyRoutes.STREAM_CHANGE_EVENTS_ROUTE) {
    // TODO: eventStream handler not exported: eventStreamHandler(remoteApi);
    return true;
  } else {
    throw createError({
      statusCode: 500,
      message: ServerErrors.UNKNOWN_ROUTE,
    });
  }
});
