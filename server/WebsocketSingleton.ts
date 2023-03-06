import ReconnectingWebSocket from "reconnecting-websocket";

console.log("ACCESS X");

export class WebsocketSingleton {
  private static _instance: ReconnectingWebSocket;
  private static _lastMessages: string[] = [];

  public static init(websocket: ReconnectingWebSocket) {
    if (!this._instance) {
      console.log("WS INITIALIZED!");

      this._instance = websocket;

      this._instance.onmessage = (msg: MessageEvent) => {
        console.log("NEW MESSAGE!");
        console.log(msg);

        const message = msg.data.toString("utf-8");
        if (this._lastMessages.includes(message)) return;
        this._lastMessages.push(message);
      };
    }
  }

  public static get instance() {
    // if (!this._instance)
    //   throw new Error("Websocket singleton needs to be initialized first!");
    if (!this._instance) return null;
    return this._instance;
  }

  public static get lastMessages() {
    return this._lastMessages;
  }
}
