import { logEvent } from './eventLogger.js';
import { EVENT_TYPES } from './eventTypes.js';

/**
 * Generic API event logging function (for use in API handlers)
 * @param {string|null} userId - The user ID (null for failed auth events will use admin user)
 * @param {string} eventType - The type of event from EVENT_TYPES
 * @param {Object} metadata - Optional metadata to store
 * @param {string} general1 - Optional general text field
 * @param {string} general2 - Optional general text field
 * @param {string} general3 - Optional general text field
 * @param {string} general4 - Optional general text field
 * @param {string} general5 - Optional general text field
 */
export async function logApiEvent(userId, eventType, metadata = null, general1 = null, general2 = null, general3 = null, general4 = null, general5 = null) {
  try {
    await logEvent(
      userId,
      eventType,
      metadata,
      general1,
      general2,
      general3,
      general4,
      general5
    );
  } catch (logError) {
    console.error(`[DEBUG] Failed to log ${eventType} event:`, logError);
  }
}

/**
 * Log a failed message creation event (for use in API handlers)
 */
export async function logMessageCreateFailed(userId, metadata, general1, general2, general3, general4, general5) {
  try {
    await logEvent(
      userId,
      EVENT_TYPES.CREATE_MESSAGE_FAILED,
      metadata,
      general1,
      general2,
      general3,
      general4,
      general5
    );
  } catch (logError) {
    console.error('[DEBUG] Failed to log CREATE_MESSAGE_FAILED event:', logError);
  }
}

/**
 * Log a successful message creation event (for use in API handlers)
 */
export async function logMessageCreateSuccess(userId, metadata, general1, general2, general3, general4, general5) {
  try {
    await logEvent(
      userId,
      EVENT_TYPES.CREATE_MESSAGE,
      metadata,
      general1,
      general2,
      general3,
      general4,
      general5
    );
  } catch (logError) {
    console.error('[DEBUG] Failed to log CREATE_MESSAGE event:', logError);
  }
}

/**
 * Log a failed message retrieval event (for use in API handlers)
 */
export async function logMessageGetFailed(userId, metadata, general1, general2, general3, general4, general5) {
  try {
    await logEvent(
      userId,
      EVENT_TYPES.GET_MESSAGE_FAILED,
      metadata,
      general1,
      general2,
      general3,
      general4,
      general5
    );
  } catch (logError) {
    console.error('[DEBUG] Failed to log GET_MESSAGE_FAILED event:', logError);
  }
} 