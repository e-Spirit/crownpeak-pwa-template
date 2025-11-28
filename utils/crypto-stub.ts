// Browser-compatible crypto stub for fsxa-api
// Provides randomUUID and randomBytes for client-side builds

export const randomUUID = (): string => {
  // Simple UUID v4 implementation for browser
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const randomBytes = (size: number): Uint8Array => {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(size)
    crypto.getRandomValues(bytes)
    return bytes
  }
  
  // Fallback using Math.random
  const bytes = new Uint8Array(size)
  for (let i = 0; i < size; i++) {
    bytes[i] = Math.floor(Math.random() * 256)
  }
  return bytes
}

export default { randomUUID, randomBytes }
