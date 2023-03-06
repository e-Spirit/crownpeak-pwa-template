import { WebsocketSingleton } from "../CaasEventListenerSingleton";

// Nuxt makes it hard to setup a global websocket connection that is accessible in the API routes as well.
// The only way to make this work right now is to initialize the websocket connection in a middleware
// Since we store the websocket connection in a global singleton, we can access it in the API routes
export default defineEventHandler((_event) => {
  try {
    const instance = WebsocketSingleton.instance;
    if (!instance) WebsocketSingleton.init();
  } catch (e) {}
});
