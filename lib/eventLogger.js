import { getSupabaseClient } from './supabase.js'
// Import centralized admin user ID for logging failed authentication events
import { ADMIN_USER_ID } from './testUserConstants.js'

/**
 * Log a user event to the user_event_logs table
 * @param {string|null} userId - The user ID (null for failed auth events will use admin user)
 * @param {string} eventType - The type of event (login, logout, failed_login, etc.)
 * @param {Object} metadata - Optional metadata to store in metadata1-5 fields
 * @param {string} general1 - Optional general text field
 * @param {string} general2 - Optional general text field
 * @param {string} general3 - Optional general text field
 * @param {string} general4 - Optional general text field
 * @param {string} general5 - Optional general text field
 * @throws {Error} - Throws error if logging fails
 */
export async function logEvent(userId, eventType, metadata = null, general1 = null, general2 = null, general3 = null, general4 = null, general5 = null) {
  const supabase = getSupabaseClient()
  
  // Use admin user ID if userId is null (for failed authentication events)
  const effectiveUserId = userId || ADMIN_USER_ID
  
  const logData = {
    user_id: effectiveUserId,
    event_type: eventType,
    created_at: new Date().toISOString()
  }

  // Add optional fields if provided
  if (metadata) logData.metadata1 = metadata
  if (general1) logData.general1 = general1
  if (general2) logData.general2 = general2
  if (general3) logData.general3 = general3
  if (general4) logData.general4 = general4
  if (general5) logData.general5 = general5

  const { error } = await supabase
    .from('user_event_logs')
    .insert(logData)

  if (error) {
    console.error('[EventLogger] Failed to log event:', {
      error: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      logData
    })
    throw new Error(`Failed to log event ${eventType}: ${error.message}`)
  }
} 