// IMPORTANT: This file is the single source of truth for all test user IDs, usernames, salts, password hashes, and plain-text passwords.
// All seed scripts (supabase/seed.sql, tests/seed.sql) and backend code (e.g., admin user ID in eventLogger.js) should use these constants for consistency.
// Update this file first if you need to change any test user credentials or IDs.
// Shared test data for API tests and database seeding
// This ensures consistency between tests and seed data

export const TEST_USERS = [
  {
    id: '11111111-1111-1111-1111-111111111111',
      full_name: 'Don Smith',
  username: 'don',
  salt: 'don_salt_2024',
    password_hash: '$2a$12$rGIstfKyTmpGXYga2koF/uAHRJM/wuTzl8eVLyAh2WmPxRubUISKu',
    role: 'coordinator',
    password: 'password123' // For testing purposes
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    full_name: 'Emily Davis',
    username: 'emily',
    salt: 'emily_salt_2024',
    password_hash: '$2a$12$lC.pL6T/b78cP5AdpzkGOeZ/wfI8pDilLQaiv4hqEQOjpCmAHriGa',
    role: 'carer',
    password: 'password123' // For testing purposes
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    full_name: 'Jake Miller',
    username: 'jake',
    salt: 'jake_salt_2024',
    password_hash: '$2a$12$gnJGYSU5R5sseP7zBEuO.OHvujpCmgonikBzpW5DHvAF8jIj0iUbS',
    role: 'carer',
    password: 'password123' // For testing purposes
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    full_name: 'Kate Jones',
    username: 'kate',
    salt: 'kate_salt_2024',
    password_hash: '$2a$12$tF13Ddz/AtTEJAmNatfoD.eAUUEGkcSQg5HvztwV1PsW7HNLtA.sm',
    role: 'coordinator',
    password: 'password123' // For testing purposes
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    full_name: 'Sarah Wilson',
    username: 'sarah',
    salt: 'sarah_salt_2024',
    password_hash: '$2a$12$sarahHashForTestingPurposesOnly',
    role: 'carer',
    password: 'password123' // For testing purposes - carer with no clock events
  },
  {
    id: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    full_name: 'System Admin',
    username: 'admin',
    salt: 'admin_salt_2024',
    password_hash: '$2a$12$UvLpq3DgwmrGvXb37tWz7.9ImpBLM/9aUCwIz0dcOjK8Cxi2PM7Me',
    role: 'system',
    password: 'password123' // For testing purposes
  }
]

export const TEST_CARE_RECIPIENTS = [
  {
    id: '44444444-4444-4444-4444-444444444444',
    full_name: 'Doris Walker',
    coordinator_id: '11111111-1111-1111-1111-111111111111'
  }
]

export const TEST_MESSAGES = [
  {
    id: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    sender_id: '11111111-1111-1111-1111-111111111111',
    title: 'Shift Reminder',
    body: 'Please remember to clock in by 8am daily.',
    is_broadcast: true
  },
  {
    id: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    sender_id: '11111111-1111-1111-1111-111111111111',
    title: 'Patient Notes',
    body: 'Doris had difficulty sleeping, please monitor tonight.',
    is_broadcast: false
  },
  {
    id: 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4',
    sender_id: '11111111-1111-1111-1111-111111111111',
    title: 'Test Message for Acknowledgment',
    body: 'This message is specifically for testing acknowledgment functionality.',
    is_broadcast: false
  },
  {
    id: 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5',
    sender_id: '11111111-1111-1111-1111-111111111111',
    title: 'Jake Only Message',
    body: 'This message is only for Jake to test access control.',
    is_broadcast: false
  }
]

export const TEST_MESSAGE_RECIPIENTS = [
  {
    message_id: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    carer_id: '22222222-2222-2222-2222-222222222222'
  },
  {
    message_id: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    carer_id: '33333333-3333-3333-3333-333333333333'
  },
  {
    message_id: 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4',
    carer_id: '22222222-2222-2222-2222-222222222222'
  },
  {
    message_id: 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5',
    carer_id: '33333333-3333-3333-3333-333333333333'
  }
]

export const TEST_MESSAGE_ACKNOWLEDGEMENTS = [
  {
    message_id: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    carer_id: '22222222-2222-2222-2222-222222222222',
    acknowledged_at: 'now() - interval \'23 hours\''
  },
  {
    message_id: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    carer_id: '33333333-3333-3333-3333-333333333333',
    acknowledged_at: 'now() - interval \'20 hours\''
  },
  {
    message_id: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    carer_id: '22222222-2222-2222-2222-222222222222',
    acknowledged_at: 'now() - interval \'1 hour\''
  }
]

// Helper function to generate care events with realistic time intervals
export const generateCareEvents = () => {
  const events = []
  
  // Emily's morning shift (8am - 2pm)
  events.push({
    carer_id: '22222222-2222-2222-2222-222222222222',
    recipient_id: '44444444-4444-4444-4444-444444444444',
    event_type: 'clock_in',
    notes: 'Morning shift begins',
    event_time: 'now() - interval \'6 hours\''
  })
  
  events.push({
    carer_id: '22222222-2222-2222-2222-222222222222',
    recipient_id: '44444444-4444-4444-4444-444444444444',
    event_type: 'medication',
    notes: 'Morning medication administered',
    event_time: 'now() - interval \'5 hours 30 minutes\''
  })
  
  events.push({
    carer_id: '22222222-2222-2222-2222-222222222222',
    recipient_id: '44444444-4444-4444-4444-444444444444',
    event_type: 'exercise',
    notes: 'Morning stretching routine',
    event_time: 'now() - interval \'4 hours\''
  })
  
  events.push({
    carer_id: '22222222-2222-2222-2222-222222222222',
    recipient_id: '44444444-4444-4444-4444-444444444444',
    event_type: 'clock_out',
    notes: 'Morning shift completed',
    event_time: 'now() - interval \'2 hours\''
  })

  // Jake's afternoon shift (2pm - 8pm)
  events.push({
    carer_id: '33333333-3333-3333-3333-333333333333',
    recipient_id: '44444444-4444-4444-4444-444444444444',
    event_type: 'clock_in',
    notes: 'Afternoon shift begins',
    event_time: 'now() - interval \'2 hours\''
  })
  
  events.push({
    carer_id: '33333333-3333-3333-3333-333333333333',
    recipient_id: '44444444-4444-4444-4444-444444444444',
    event_type: 'medication',
    notes: 'Afternoon medication given',
    event_time: 'now() - interval \'1 hour 30 minutes\''
  })
  
  events.push({
    carer_id: '33333333-3333-3333-3333-333333333333',
    recipient_id: '44444444-4444-4444-4444-444444444444',
    event_type: 'exercise',
    notes: 'Afternoon walk in garden',
    event_time: 'now() - interval \'45 minutes\''
  })
  
  events.push({
    carer_id: '33333333-3333-3333-3333-333333333333',
    recipient_id: '44444444-4444-4444-4444-444444444444',
    event_type: 'clock_out',
    notes: 'Afternoon shift completed',
    event_time: 'now() - interval \'15 minutes\''
  })
  
  return events
}

// Helper functions for tests
export const findUserByUsername = (username) => {
  return TEST_USERS.find(user => user.username === username)
}

export const findUserById = (id) => {
  return TEST_USERS.find(user => user.id === id)
}

export const getCoordinator = () => {
  return TEST_USERS.find(user => user.role === 'coordinator')
}

export const getKateJones = () => {
  return TEST_USERS.find(user => user.username === 'kate')
}

export const getCarers = () => {
  return TEST_USERS.filter(user => user.role === 'carer')
} 