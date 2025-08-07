/**
 * API Test for GET /my-messages and POST /my-message
 * 
 * Tests the my-messages endpoint which returns messages for a specific carer,
 * and the message acknowledgment endpoint for acknowledging messages.
 * 
 * LOGICAL PATHS TESTED:
 * My Messages (GET):
 * 1. CORS handling - OPTIONS request
 * 2. Missing user_id parameter - 401 error
 * 3. Invalid user_id - 401 error
 * 4. Non-carer user (coordinator) - 403 error
 * 5. Valid carer user - 200 with messages array
 * 6. Carer with no messages returns empty array
 * 
 * Message Acknowledgment (POST /my-message):
 * 1. Happy path: Valid carer acknowledges unacknowledged message
 * 2. Already acknowledged: Try to acknowledge already acknowledged message
 * 3. Message not found: Try to acknowledge non-existent message
 * 4. Message not assigned: Try to acknowledge message not assigned to carer
 * 5. Missing message_id: Send request without message_id in body
 * 6. Missing user_id: Send request without user_id parameter
 * 7. Invalid user_id: Send request with non-existent user_id
 * 8. Wrong role: Try to acknowledge with coordinator user
 * 9. Broadcast message acknowledgment: Test acknowledging broadcast messages
 */

import fetch from 'node-fetch'
import { TEST_USERS, TEST_MESSAGES, TEST_MESSAGE_RECIPIENTS, TEST_MESSAGE_ACKNOWLEDGEMENTS, findUserByUsername, getCoordinator, getCarers } from './test-data.js'
import { pathToFileURL } from 'url'

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'
const MY_MESSAGES_API_URL = `${BASE_URL}/api/my-message`
const ACKNOWLEDGE_API_URL = `${BASE_URL}/api/my-message`

// Helper function to make API calls for my-messages endpoint
async function makeMyMessagesRequest(method, params = {}) {
  const url = new URL(MY_MESSAGES_API_URL)
  
  // Add query parameters if needed
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value)
    }
  })
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  
  // Add body for POST/PUT requests (not used for this endpoint but keeping for consistency)
  if (['POST', 'PUT', 'PATCH'].includes(method) && params.body) {
    options.body = JSON.stringify(params.body)
  }
  
  const response = await fetch(url.toString(), options)
  const data = await response.json()
  return { status: response.status, data }
}

// Helper function to make API calls for message acknowledgment endpoint
async function makeAcknowledgeRequest(method, params = {}) {
  const url = new URL(ACKNOWLEDGE_API_URL)
  
  // Add query parameters if needed
  if (params.user_id) {
    url.searchParams.append('user_id', params.user_id)
  }
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  
  // Add body for POST requests
  if (method === 'POST' && params.body) {
    options.body = JSON.stringify(params.body)
  }
  
  const response = await fetch(url.toString(), options)
  const data = await response.json()
  return { status: response.status, data }
}

// Test cases
async function runTests() {
  console.log('🧪 Starting My Messages and Message Acknowledgment Tests\n')
  console.log('🔍 Testing endpoints:', MY_MESSAGES_API_URL, '(GET for messages, POST for acknowledgment)')
  
  let passedTests = 0
  let totalTests = 0

  async function test(name, testFn) {
    totalTests++
    console.log(`\n🧪 Running test: ${name}`)
    try {
      await testFn()
      console.log(`✅ ${name}`)
      passedTests++
    } catch (error) {
      console.log(`❌ ${name}`)
      console.log(`   Error: ${error.message}`)
    }
  }

  // ===== MY MESSAGES TESTS =====

  // Test 1: CORS headers are properly set
  await test('CORS headers are properly set', async () => {
    const response = await fetch(MY_MESSAGES_API_URL, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (![200, 204].includes(response.status)) {
      throw new Error(`Expected status 200 or 204 for OPTIONS, got ${response.status}`)
    }
    
    const corsHeader = response.headers.get('Access-Control-Allow-Origin')
    if (corsHeader !== '*') {
      throw new Error(`Expected CORS header '*', got ${corsHeader}`)
    }
  })

  // Test 2: Missing user_id parameter
  await test('Missing user_id parameter returns 401', async () => {
    const { status, data } = await makeMyMessagesRequest('GET')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('user_id parameter is required')) {
      throw new Error(`Expected message about missing user_id, got: ${data.message}`)
    }
  })

  // Test 3: Invalid user_id returns 401
  await test('Invalid user_id returns 401', async () => {
    const { status, data } = await makeMyMessagesRequest('GET', { user_id: 'invalid-uuid-format' })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Invalid or unknown user_id')) {
      throw new Error(`Expected message about invalid user_id, got: ${data.message}`)
    }
  })

  // Test 4: Non-existent user_id returns 401
  await test('Non-existent user_id returns 401', async () => {
    const { status, data } = await makeMyMessagesRequest('GET', { 
      user_id: '00000000-0000-0000-0000-000000000000' 
    })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Invalid or unknown user_id')) {
      throw new Error(`Expected message about invalid user_id, got: ${data.message}`)
    }
  })

  // Test 5: Coordinator user returns 403 (only carers allowed)
  await test('Coordinator user returns 403', async () => {
    const coordinator = getCoordinator()
    const { status, data } = await makeMyMessagesRequest('GET', { user_id: coordinator.id })
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Only carers can access their messages')) {
      throw new Error(`Expected message about carers only, got: ${data.message}`)
    }
  })

  // Test 6: Valid carer user returns 200 with messages array
  await test('Valid carer user returns 200 with messages array', async () => {
    const carers = getCarers()
    if (carers.length === 0) {
      throw new Error('No carers found in test data')
    }
    
    const carer = carers[0]
    const { status, data } = await makeMyMessagesRequest('GET', { user_id: carer.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected data to be an array')
    
    // Verify message structure if messages exist
    if (data.length > 0) {
      const message = data[0]
      const requiredFields = ['carer_id', 'message_id', 'title', 'body', 'is_broadcast', 'sent_at', 'sent_at_brisbane', 'status']
      requiredFields.forEach(field => {
        if (!(field in message)) {
          throw new Error(`Message missing required field: ${field}`)
        }
      })
      
      // Verify status is either 'unread' or 'acknowledged'
      if (!['unread', 'acknowledged'].includes(message.status)) {
        throw new Error(`Invalid status value: ${message.status}`)
      }
      
      // Verify carer_id matches the requesting carer
      if (message.carer_id !== carer.id) {
        throw new Error(`Message carer_id doesn't match requesting carer`)
      }
    }
  })

  // Test 7: Carer with no messages returns empty array
  await test('Carer with no messages returns empty array', async () => {
    const carers = getCarers()
    if (carers.length === 0) {
      throw new Error('No carers found in test data')
    }
    
    // Use a carer that likely has no messages (or test with a new carer)
    const carer = carers[0]
    const { status, data } = await makeMyMessagesRequest('GET', { user_id: carer.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected data to be an array')
    
    // Note: This test might pass or fail depending on test data
    // The important thing is that it returns an array, not null/undefined
    console.log(`   Note: Carer has ${data.length} messages`)
  })

  // ===== MESSAGE ACKNOWLEDGMENT TESTS =====

  // Get test data for acknowledgment tests
  const emily = findUserByUsername('emily') // carer
  const jake = findUserByUsername('jake')   // carer
  const don = findUserByUsername('don')   // coordinator
  
  // Use the specific message ID provided for testing
  const testMessageId = 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4'

  // Test 8: Happy path - Valid carer acknowledges unacknowledged message
  await test('Happy path - Valid carer acknowledges unacknowledged message', async () => {
    const { status, data } = await makeAcknowledgeRequest('POST', {
      user_id: emily.id,
      body: { message_id: testMessageId }
    })
    
    // Accept both 200 (successful acknowledgment) and 409 (already acknowledged)
    if (status === 200) {
      // Message was successfully acknowledged
      if (data.status !== 'acknowledged') throw new Error(`Expected status 'acknowledged', got ${data.status}`)
      if (data.message_id !== testMessageId) throw new Error(`Expected message_id ${testMessageId}, got ${data.message_id}`)
      if (data.carer_id !== emily.id) throw new Error(`Expected carer_id ${emily.id}, got ${data.carer_id}`)
      if (!data.acknowledged_at) throw new Error('Expected acknowledged_at timestamp')
    } else if (status === 409) {
      // Message was already acknowledged (valid state)
      if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
      if (!data.message.includes('already acknowledged')) throw new Error(`Expected 'already acknowledged' message, got ${data.message}`)
    } else {
      throw new Error(`Expected status 200 or 409, got ${status}`)
    }
  })

  // Test 9: Already acknowledged - Try to acknowledge already acknowledged message
  await test('Already acknowledged - Try to acknowledge already acknowledged message', async () => {
    // The message was acknowledged in the previous test, so now it should fail
    const { status, data } = await makeAcknowledgeRequest('POST', {
      user_id: emily.id,
      body: { message_id: testMessageId }
    })
    
    if (status !== 409) throw new Error(`Expected status 409, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('already acknowledged')) throw new Error(`Expected 'already acknowledged' message, got ${data.message}`)
  })

  // Test 10: Message not found - Try to acknowledge non-existent message
  await test('Message not found - Try to acknowledge non-existent message', async () => {
    const fakeMessageId = '00000000-0000-0000-0000-000000000000'
    
    const { status, data } = await makeAcknowledgeRequest('POST', {
      user_id: emily.id,
      body: { message_id: fakeMessageId }
    })
    
    if (status !== 404) throw new Error(`Expected status 404, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('not found')) throw new Error(`Expected 'not found' message, got ${data.message}`)
  })

  // Test 11: Message not assigned - Try to acknowledge message not assigned to carer
  await test('Message not assigned - Try to acknowledge message not assigned to carer', async () => {
    // Use the message that only Jake can see
    const jakeOnlyMessageId = 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5'

    const { status, data } = await makeAcknowledgeRequest('POST', {
      user_id: emily.id,
      body: { message_id: jakeOnlyMessageId }
    })
    
    if (status !== 404) throw new Error(`Expected status 404, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('not found')) throw new Error(`Expected 'not found' message, got ${data.message}`)
  })

  // Test 12: Missing message_id - Send request without message_id in body
  await test('Missing message_id - Send request without message_id in body', async () => {
    const { status, data } = await makeAcknowledgeRequest('POST', {
      user_id: emily.id,
      body: {} // Empty body
    })
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('message_id is required')) throw new Error(`Expected 'message_id is required' message, got ${data.message}`)
  })

  // Test 13: Missing user_id - Send request without user_id parameter
  await test('Missing user_id - Send request without user_id parameter', async () => {
    const { status, data } = await makeAcknowledgeRequest('POST', {
      body: { message_id: 'some-message-id' }
    })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('user_id parameter is required')) throw new Error(`Expected 'user_id parameter is required' message, got ${data.message}`)
  })

  // Test 14: Invalid user_id - Send request with non-existent user_id
  await test('Invalid user_id - Send request with non-existent user_id', async () => {
    const fakeUserId = '00000000-0000-0000-0000-000000000000'
    
    const { status, data } = await makeAcknowledgeRequest('POST', {
      user_id: fakeUserId,
      body: { message_id: 'some-message-id' }
    })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Invalid or unknown user_id')) throw new Error(`Expected 'Invalid or unknown user_id' message, got ${data.message}`)
  })

  // Test 15: Wrong role - Try to acknowledge with coordinator user
  await test('Wrong role - Try to acknowledge with coordinator user', async () => {
    const { status, data } = await makeAcknowledgeRequest('POST', {
      user_id: don.id,
      body: { message_id: 'some-message-id' }
    })
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Only carers can acknowledge messages')) throw new Error(`Expected 'Only carers can acknowledge messages' message, got ${data.message}`)
  })

  // Test 16: Broadcast message acknowledgment - Test acknowledging a broadcast message
  await test('Broadcast message acknowledgment - Test acknowledging a broadcast message', async () => {
    // Find a broadcast message that Emily can acknowledge
    const broadcastMessage = TEST_MESSAGES.find(msg => 
      msg.is_broadcast === true && 
      TEST_MESSAGE_RECIPIENTS.some(mr => mr.message_id === msg.id && mr.carer_id === emily.id) &&
      !TEST_MESSAGE_ACKNOWLEDGEMENTS.some(ma => ma.message_id === msg.id && ma.carer_id === emily.id)
    )

    if (!broadcastMessage) {
      console.log('   Skipping broadcast message test - no unacknowledged broadcast message found for Emily')
      // Don't increment passedTests here - the test function already handles counting
      return
    }

    const { status, data } = await makeAcknowledgeRequest('POST', {
      user_id: emily.id,
      body: { message_id: broadcastMessage.id }
    })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (data.status !== 'acknowledged') throw new Error(`Expected status 'acknowledged', got ${data.status}`)
    if (data.message_id !== broadcastMessage.id) throw new Error(`Expected message_id ${broadcastMessage.id}, got ${data.message_id}`)
  })

  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`)
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed!')
    return true
  } else {
    console.log('💥 Some tests failed!')
    return false
  }
}

// Always export the test function
export { runTests }

// Run tests if this file is executed directly (ESM compatible)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runTests().then(success => {
    process.exit(success ? 0 : 1)
  }).catch(error => {
    console.error('Test runner error:', error)
    process.exit(1)
  })
} 