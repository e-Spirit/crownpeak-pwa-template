import { FSXAApiSingleton, FSXARemoteApi } from "fsxa-api";
import ReconnectingWebSocket from "reconnecting-websocket";
import WebSocket from "ws";
import { WebsocketSingleton } from "../WebsocketSingleton";

// Nuxt makes it hard to setup a global websocket connection that is accessible in the API routes as well.
// The only way to make this work right now is to initialize the websocket connection in a middleware
// Since we store the websocket connection in a global singleton, we can access it in the API routes
export default defineEventHandler((_event) => {
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

      const socket = new ReconnectingWebSocket(createSocketUrl, [], {
        WebSocket,
        startClosed: false,
      });

      // Set Singleton
      WebsocketSingleton.init(socket);
    }
  } catch (e) {}
});
