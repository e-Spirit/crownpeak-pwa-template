import ReconnectingWebSocket from "reconnecting-websocket";

export class WebsocketSingleton {
  private static instance: ReconnectingWebSocket;
  private static lastMessages: string[] = [];

  public static init(websocket: ReconnectingWebSocket) {
    if (!WebsocketSingleton.instance) {
      WebsocketSingleton.instance = websocket;
      console.log(websocket);
      console.log(WebsocketSingleton.instance);
      WebsocketSingleton.instance.onmessage = (msg: MessageEvent) => {
        const message = msg.data.toString("utf-8");
        if (WebsocketSingleton.lastMessages.includes(message)) return;
        WebsocketSingleton.lastMessages.push(message);
      };
    }
  }

  static getInstance() {
    return WebsocketSingleton.instance;
  }

  static getLastMessages() {
    return WebsocketSingleton.lastMessages;
  }
}
