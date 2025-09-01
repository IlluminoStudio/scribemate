// Simple logging functions for the server
export const log = (message) => console.log(`[${new Date().toISOString()}] ${message}`)
export const logError = (message) => console.error(`[${new Date().toISOString()}] ERROR: ${message}`) 