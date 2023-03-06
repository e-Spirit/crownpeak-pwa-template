import { FSXAApiSingleton, FSXARemoteApi } from "fsxa-api";
import ReconnectingWebSocket from "reconnecting-websocket";
import { WebSocket } from "ws";
import { WebsocketSingleton } from "~~/server/WebsocketSingleton";
import { ServerErrors, FSXAProxyRoutes, FSXAApiErrors } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const instance = WebsocketSingleton.instance;

    if (!instance) {
      const remoteApi = FSXAApiSingleton.instance as FSXARemoteApi;
      const createSocketUrl = async () => {
        const caasUrl = remoteApi.buildCaaSUrl().split("?")[0];
        const token = await remoteApi.fetchSecureToken();
        const socketUrl = `${caasUrl!.replace(
          /^http/,
          "ws"
        )}/_streams/crud?securetoken=${token}`;
        return socketUrl;
      };

      console.log(await createSocketUrl());

      const socket = new ReconnectingWebSocket(createSocketUrl, [], {
        WebSocket,
        startClosed: false,
      });

      WebsocketSingleton.init(socket);
    }
  } catch (e) {
    console.log(e);
  }

  const remoteApi = FSXAApiSingleton.instance; // throws error if undefined
  const body = await readBody(event);
  const endpoint = event.context["params"]?.["endpoint"];

  // TODO: This is because of a mismatch between the FSXA API and the FSXA Proxy API, which should be fixed in the future
  body.filters = body.filter;

  try {
    switch (`/${endpoint}`) {
      case FSXAProxyRoutes.FETCH_ELEMENT_ROUTE:
        return await remoteApi.fetchElement(body);
      case FSXAProxyRoutes.FETCH_BY_FILTER_ROUTE:
        return await remoteApi.fetchByFilter(body);
      case FSXAProxyRoutes.FETCH_NAVIGATION_ROUTE:
        return await remoteApi.fetchNavigation(body);
      case FSXAProxyRoutes.FETCH_PROPERTIES_ROUTE:
        return await remoteApi.fetchProjectProperties(body);
      default:
        throw new Error(ServerErrors.UNKNOWN_ROUTE);
    }
  } catch (err) {
    if (!(err instanceof Error)) {
      throw createError({
        statusCode: 500,
        message: ServerErrors.UNKNOWN,
      });
    } else if (
      err.message === FSXAApiErrors.NOT_FOUND ||
      err.message === FSXAApiErrors.UNKNOWN_REMOTE
    ) {
      throw createError({
        statusCode: 404,
        message: err.message,
      });
    } else if (FSXAApiErrors.NOT_AUTHORIZED === err.message) {
      throw createError({
        statusCode: 401,
        message: err.message,
      });
    } else {
      throw createError({
        statusCode: 500,
        message: err.message || ServerErrors.UNKNOWN,
      });
    }
  }
});
