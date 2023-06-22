import { FSXAApiSingleton, FSXARemoteApi } from 'fsxa-api'
import ReconnectingWebSocket from 'reconnecting-websocket'

/**
 * The CaasEventListenerSingleton holds a websocket connection to the CaaS and listens for content changes there.
 * It is initialized in the initCaasEventListener middleware and used by the api [endpoint].get.ts
 * */
export class CaasEventListenerSingleton {
  private static _instance: ReconnectingWebSocket
  private static _lastMessages: string[] = []

  public static init() {
    if (!this._instance) {
      const remoteApi = FSXAApiSingleton.instance as FSXARemoteApi

      const createSocketUrl = async () => {
        const caasUrl = remoteApi.buildCaaSUrl().split('?')[0]
        const token = await remoteApi.fetchSecureToken()
        const socketUrl = `${caasUrl!.replace(
          /^http/,
          'ws'
        )}/_streams/crud?securetoken=${token}`
        return socketUrl
      }

      this._instance = new ReconnectingWebSocket(createSocketUrl, [], {
        WebSocket,
        startClosed: false
      })

      // It is possible that we get a message before we can register the event in the endpoint
      // so we store the last messages here as well and read them in the endpoint
      this._instance.onmessage = (msg: MessageEvent) => {
        const message = msg.data.toString('utf-8')
        if (this._lastMessages.includes(message)) return
        this._lastMessages.push(message)
      }
    }
  }

  public static get instance() {
    if (!this._instance) return null
    return this._instance
  }

  public static get lastMessages() {
    return this._lastMessages
  }
}
