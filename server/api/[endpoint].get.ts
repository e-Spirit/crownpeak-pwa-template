import { randomUUID } from "crypto";
import { FSXAProxyRoutes } from "fsxa-api";
import { ServerErrors } from "~~/types";
import { WebsocketSingleton } from "~~/server/WebsocketSingleton";

export default defineEventHandler(async (event) => {
  const endpoint = event.context["params"]?.["endpoint"];
  console.log("GET INSTANCE");
  const websocket = WebsocketSingleton.getInstance();
  console.log(websocket);

  if (`/${endpoint}` === FSXAProxyRoutes.STREAM_CHANGE_EVENTS_ROUTE) {
    const id = randomUUID();

    // event-stream specific headers
    event.node.res.writeHead(200, {
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
    });

    const sendEvent = (data: string) => {
      event.node.res.write(`id: ${id}\n`);
      event.node.res.write(`data: ${data}\n\n`); // Note the extra newline
    };

    // send all of the messages that we received before the client connected
    WebsocketSingleton.getLastMessages().forEach((msg: string) =>
      sendEvent(msg)
    );

    // on websocket message, send event to client
    websocket.onmessage = (msg: MessageEvent) =>
      sendEvent(msg.data.toString("utf-8"));

    // dont end the connection, wait for the client to close it
    await new Promise((resolve) => {
      event.node.res.on("close", () => {
        resolve(null);
      });
    });
  } else {
    throw createError({
      statusCode: 500,
      message: ServerErrors.UNKNOWN_ROUTE,
    });
  }
});
