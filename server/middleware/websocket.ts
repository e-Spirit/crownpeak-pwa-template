import { FSXAApiSingleton, FSXARemoteApi } from "fsxa-api";
import ReconnectingWebSocket from "reconnecting-websocket";
import WebSocket from "ws";
import { WebsocketSingleton } from "../WebsocketSingleton";

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

      WebsocketSingleton.init(socket);
    }
  } catch (e) {}
});
