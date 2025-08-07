/**
 * Common event types for user event logging
 * Used across API endpoints to ensure consistency
 */

export const EVENT_TYPES = {
  // Authentication events
  LOGIN: 'login',
  LOGIN_FAILED: 'login_failed',
  LOGOUT: 'logout',
  LOGOUT_FAILED: 'logout_failed',
  
  // Message events
  CREATE_MESSAGE: 'create_message',
  CREATE_MESSAGE_FAILED: 'create_message_failed',
  ACK_MESSAGE: 'ack_message',
  ACK_MESSAGE_FAILED: 'ack_message_failed',
  GET_MESSAGE_FAILED: 'get_message_failed',
  
  // Care event events
  CREATE_CARE_EVENT: 'create_care_event',
  CREATE_CARE_EVENT_FAILED: 'create_care_event_failed',
  
  // Clock status events
  GET_CLOCK_STATUS_FAILED: 'get_clock_status_failed',
  
  // Care events retrieval events
  GET_CARE_EVENTS_FAILED: 'get_care_events_failed',
  
  // Generic failed operations
  OPERATION_FAILED: 'operation_failed'
} 