/**
 * Shared console logging utility for consistent timestamped logging across all API modules
 */

// Helper function to add timestamps to console messages
export function log(message, type = 'log') {
  const timestamp = new Date().toLocaleString('en-AU', {
    timeZone: 'Australia/Brisbane',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  const formattedMessage = `[${timestamp}] ${message}`
  
  if (type === 'error') {
    console.error(formattedMessage)
  } else {
    console.log(formattedMessage)
  }
}

// Convenience methods for different log levels
export function logError(message) {
  log(message, 'error')
}

export function logInfo(message) {
  log(message, 'log')
} 