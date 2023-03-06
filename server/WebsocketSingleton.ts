import ReconnectingWebSocket from "reconnecting-websocket";

// WebsocketSingleton is a singleton that holds the websocket connection, set by the middleware, and used by the endpoint
export class WebsocketSingleton {
  private static _instance: ReconnectingWebSocket;
  private static _lastMessages: string[] = [];

  public static init(websocket: ReconnectingWebSocket) {
    if (!this._instance) {
      this._instance = websocket;

      this._instance.onmessage = (msg: MessageEvent) => {
        const message = msg.data.toString("utf-8");
        if (this._lastMessages.includes(message)) return;
        this._lastMessages.push(message);
      };
    }
  }

  public static get instance() {
    if (!this._instance) return null;
    return this._instance;
  }

  public static get lastMessages() {
    return this._lastMessages;
  }
}
