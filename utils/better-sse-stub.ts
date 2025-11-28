// Browser-compatible stub for better-sse (server-only package)
// This file is used on the client-side to avoid importing Node.js-only modules

export const createSession = () => {
  throw new Error('better-sse is only available on the server side')
}

export const createChannel = () => {
  throw new Error('better-sse is only available on the server side')
}

export default {
  createSession,
  createChannel
}
