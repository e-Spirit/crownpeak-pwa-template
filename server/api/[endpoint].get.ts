import { FSXAApiSingleton } from "fsxa-api";
// @ts-ignore
import { FSXAProxyRoutes } from "fsxa-api/dist/lib/enums";
// @ts-ignore
import { eventStreamHandler } from "fsxa-api/dist/lib/modules";
import { ServerErrors } from "~/types";

export default defineEventHandler((event) => {
  const remoteApi = FSXAApiSingleton.instance; // throws error if undefined
  const { endpoint } = event.context["params"];
  if (`/${endpoint}` === FSXAProxyRoutes.STREAM_CHANGE_EVENTS_ROUTE) {
    eventStreamHandler(remoteApi);
    return true;
  } else {
    throw createError({
      statusCode: 500,
      message: ServerErrors.UNKNOWN_ROUTE,
    });
  }
});
