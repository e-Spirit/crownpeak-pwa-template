import { randomUUID } from 'crypto'
import { FSXAProxyRoutes } from 'fsxa-api'
import { CaasEventListenerSingleton } from '~~/server/CaasEventListenerSingleton'
import { ServerErrors } from '~~/types'

export default defineEventHandler(async (event) => {
  const endpoint = event.context['params']?.['endpoint']

  if (`/${endpoint}` === FSXAProxyRoutes.STREAM_CHANGE_EVENTS_ROUTE) {
    // caasEventListener is already set by middleware
    const caasEventListener = CaasEventListenerSingleton.instance

    // Id to identify the event stream
    const id = randomUUID()

    // event-stream specific headers
    event.node.res.writeHead(200, {
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream'
    })

    const sendEvent = (data: string) => {
      event.node.res.write(`id: ${id}\n`)
      event.node.res.write(`data: ${data}\n\n`) // Note the extra newline
    }

    // send all of the messages that we received before the client connected
    CaasEventListenerSingleton.lastMessages.forEach((msg: string) =>
      sendEvent(msg)
    )

    // on caasEventListener message, send event to client
    if (caasEventListener)
      caasEventListener.onmessage = (msg: MessageEvent) =>
        sendEvent(msg.data.toString('utf-8'))

    // dont end the connection, wait for the client to close it
    await new Promise((resolve) => {
      event.node.res.on('close', () => {
        resolve(null)
      })
    })
  } else {
    throw createError({
      statusCode: 500,
      message: ServerErrors.UNKNOWN_ROUTE
    })
  }
})
