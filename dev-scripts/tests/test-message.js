/**
 * API Test for GET /message and POST /message endpoints
 * 
 * Tests the coordinator-only endpoints for message management.
 * 
 * Test Coverage:
 * GET /message:
 * - Basic functionality (coordinator gets their messages)
 * - Status filtering (status=unread)
 * - Invalid status parameter handling
 * - Response structure validation
 * - Error handling (invalid user_id)
 * - Authorization (carer cannot access)
 * - Missing parameters
 * - CORS headers
 * 
 * POST /message:
 * - Successful broadcast message creation
 * - Successful private message creation
 * - Validation errors (missing fields, invalid carer_ids)
 * - Authorization errors (carer cannot create messages)
 * - Database error handling
 */

import fetch from 'node-fetch'
import { TEST_USERS, findUserByUsername, getCoordinator, getCarers, getKateJones } from './test-data.js'
import { pathToFileURL } from 'url'

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'
const API_URL = `${BASE_URL}/api/message`

// Helper function to make API calls
async function makeApiRequest(method, params = {}) {
  const url = new URL(API_URL)
  
  // Add query parameters if needed
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && key !== 'body') {
      url.searchParams.append(key, value)
    }
  })
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  
  // Add body for POST/PUT requests
  if (['POST', 'PUT', 'PATCH'].includes(method) && params.body) {
    options.body = JSON.stringify(params.body)
  }
  
  const response = await fetch(url.toString(), options)
  const data = await response.json()
  return { status: response.status, data }
}

// Test cases
async function runTests() {
  console.log('🧪 Starting Message API Tests\n')
  console.log('🔍 Testing endpoint:', API_URL)
  
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

  // ===== GET /message TESTS =====

  // Test 1: Basic functionality - coordinator gets their messages
  await test('GET: Coordinator can get their message list', async () => {
    const coordinator = getCoordinator()
    const { status, data } = await makeApiRequest('GET', { user_id: coordinator.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array of messages')
    
    // Verify message structure
    if (data.length > 0) {
      const message = data[0]
      if (!message.id || !message.sender_id || !message.title || !message.body || 
          typeof message.is_broadcast !== 'boolean' || !message.created_at) {
        throw new Error('Message object missing required fields')
      }
      
      // Verify all messages belong to the coordinator
      const nonCoordinatorMessages = data.filter(msg => msg.sender_id !== coordinator.id)
      if (nonCoordinatorMessages.length > 0) {
        throw new Error('Found messages not authored by the coordinator')
      }
    }
  })

  // Test 2: Carer cannot access messages (403 error)
  await test('GET: Carer cannot access message endpoint', async () => {
    const carer = getCarers()[0]
    const { status, data } = await makeApiRequest('GET', { user_id: carer.id })
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('not a coordinator')) {
      throw new Error(`Expected coordinator error message, got: ${data.message}`)
    }
  })

  // Test 3: Invalid user_id returns 401
  await test('GET: Invalid user_id returns 401', async () => {
    const { status, data } = await makeApiRequest('GET', { user_id: 'invalid-id' })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Invalid or unknown user_id')) {
      throw new Error(`Expected invalid user error message, got: ${data.message}`)
    }
  })

  // Test 4: Missing user_id parameter
  await test('GET: Missing user_id parameter', async () => {
    const { status, data } = await makeApiRequest('GET')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('user_id parameter is required')) {
      throw new Error(`Expected missing parameter error message, got: ${data.message}`)
    }
  })

  // Test 5: CORS headers are properly set
  await test('GET: CORS headers are properly set', async () => {
    const response = await fetch(API_URL, {
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

  // Test 6: Empty result for coordinator with no messages
  await test('GET: Coordinator with no messages gets empty array', async () => {
    // Use Kate Jones who has no messages
    const kate = getKateJones()
    const { status, data } = await makeApiRequest('GET', { user_id: kate.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array of messages')
    if (data.length !== 0) throw new Error(`Expected empty array, got ${data.length} messages`)
  })

  // Test 7: Messages are ordered by created_at descending
  await test('GET: Message list is ordered by created_at descending', async () => {
      const don = getCoordinator()
  const { status, data } = await makeApiRequest('GET', { user_id: don.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array of messages')
    
    // Check ordering if there are multiple messages
    if (data.length > 1) {
      for (let i = 0; i < data.length - 1; i++) {
        const currentDate = new Date(data[i].created_at)
        const nextDate = new Date(data[i + 1].created_at)
        if (currentDate < nextDate) {
          throw new Error('Messages are not ordered by created_at descending')
        }
      }
    }
  })

  // Test 8: GET with status=unread filters correctly
  await test('GET: status=unread filters to unacknowledged messages only', async () => {
    const don = getCoordinator()
    const { status, data } = await makeApiRequest('GET', { 
      user_id: don.id,
      status: 'unread'
    })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array of messages')
    
    // All returned messages should have is_acknowledged = false
    const acknowledgedMessages = data.filter(msg => msg.is_acknowledged === true)
    if (acknowledgedMessages.length > 0) {
      throw new Error(`Found ${acknowledgedMessages.length} acknowledged messages in unread filter`)
    }
    
    // Should contain messages that are unacknowledged by at least one carer
    // Based on seed data: message 3 (broadcast, no acks) and message 4 (private, no acks)
    // and message 2 for Jake (he hasn't acknowledged it)
    if (data.length === 0) {
      throw new Error('Expected unread messages but got empty array')
    }
  })

  // Test 9: GET with invalid status parameter returns all messages
  await test('GET: Invalid status parameter returns all messages', async () => {
    const don = getCoordinator()
    const { status, data } = await makeApiRequest('GET', { 
      user_id: don.id,
      status: 'invalid_status'
    })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array of messages')
    
    // Should return all messages (same as no status parameter)
    const allMessagesResponse = await makeApiRequest('GET', { user_id: don.id })
    if (data.length !== allMessagesResponse.data.length) {
      throw new Error(`Expected same number of messages as without status filter, got ${data.length} vs ${allMessagesResponse.data.length}`)
    }
  })

  // Test 10: GET with status=unread for coordinator with no messages
  await test('GET: status=unread for coordinator with no messages returns empty array', async () => {
    const kate = getKateJones()
    const { status, data } = await makeApiRequest('GET', { 
      user_id: kate.id,
      status: 'unread'
    })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array of messages')
    if (data.length !== 0) throw new Error(`Expected empty array, got ${data.length} messages`)
  })

  // Test 11: GET with status=unread response structure validation
  await test('GET: status=unread response has correct structure', async () => {
    const don = getCoordinator()
    const { status, data } = await makeApiRequest('GET', { 
      user_id: don.id,
      status: 'unread'
    })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array of messages')
    
    // Verify message structure for unread messages
    if (data.length > 0) {
      const message = data[0]
      if (!message.id || !message.sender_id || !message.title || !message.body || 
          typeof message.is_broadcast !== 'boolean' || !message.created_at ||
          typeof message.is_acknowledged !== 'boolean') {
        throw new Error('Message object missing required fields')
      }
      
      // All messages should be unacknowledged
      if (message.is_acknowledged !== false) {
        throw new Error('Unread filter returned acknowledged message')
      }
      
      // Verify all messages belong to the coordinator
      if (message.sender_id !== don.id) {
        throw new Error('Found message not authored by the coordinator')
      }
    }
  })

  // Test 12: GET with status=unread includes carer-specific acknowledgment status
  await test('GET: status=unread includes carer-specific acknowledgment data', async () => {
    const don = getCoordinator()
    const { status, data } = await makeApiRequest('GET', { 
      user_id: don.id,
      status: 'unread'
    })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array of messages')
    
    // Should include carer_id and carer_name for each message
    if (data.length > 0) {
      const message = data[0]
      if (!message.carer_id || !message.carer_name) {
        throw new Error('Message missing carer_id or carer_name fields')
      }
    }
  })

  // Test 13: GET with status=unread for carer returns 403
  await test('GET: status=unread for carer returns 403', async () => {
    const carer = getCarers()[0]
    const { status, data } = await makeApiRequest('GET', { 
      user_id: carer.id,
      status: 'unread'
    })
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('not a coordinator')) {
      throw new Error(`Expected coordinator error message, got: ${data.message}`)
    }
  })

  // Test 14: GET with status=unread and invalid user_id returns 401
  await test('GET: status=unread with invalid user_id returns 401', async () => {
    const { status, data } = await makeApiRequest('GET', { 
      user_id: 'invalid-id',
      status: 'unread'
    })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Invalid or unknown user_id')) {
      throw new Error(`Expected invalid user error message, got: ${data.message}`)
    }
  })

  // Test 15: GET with status=unread and missing user_id returns 401
  await test('GET: status=unread with missing user_id returns 401', async () => {
    const { status, data } = await makeApiRequest('GET', { 
      status: 'unread'
    })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('user_id parameter is required')) {
      throw new Error(`Expected missing parameter error message, got: ${data.message}`)
    }
  })

  // ===== POST /message TESTS =====

  // Test 16: Successful broadcast message creation
  await test('POST: Successful broadcast message creation', async () => {
    const coordinator = getCoordinator()
    const messageData = {
      title: 'Test Broadcast Message',
      body: 'This is a test broadcast message',
      is_broadcast: true
    }
    
    const { status, data } = await makeApiRequest('POST', { 
      user_id: coordinator.id,
      body: messageData
    })
    
    if (status !== 201) throw new Error(`Expected status 201, got ${status}`)
    if (!data.id) throw new Error('Message should have an ID')
    if (data.sender_id !== coordinator.id) throw new Error('Message sender_id should match coordinator')
    if (data.title !== messageData.title) throw new Error('Message title should match')
    if (data.body !== messageData.body) throw new Error('Message body should match')
    if (data.is_broadcast !== true) throw new Error('Message should be marked as broadcast')
    if (!data.created_at) throw new Error('Message should have created_at timestamp')
  })

  // Test 17: Successful private message creation
  await test('POST: Successful private message creation', async () => {
    const coordinator = getCoordinator()
    const carers = getCarers()
    const messageData = {
      title: 'Test Private Message',
      body: 'This is a test private message',
      is_broadcast: false,
      carer_id: [carers[0].id, carers[1].id]
    }
    
    const { status, data } = await makeApiRequest('POST', { 
      user_id: coordinator.id,
      body: messageData
    })
    
    if (status !== 201) throw new Error(`Expected status 201, got ${status}`)
    if (!data.id) throw new Error('Message should have an ID')
    if (data.sender_id !== coordinator.id) throw new Error('Message sender_id should match coordinator')
    if (data.title !== messageData.title) throw new Error('Message title should match')
    if (data.body !== messageData.body) throw new Error('Message body should match')
    if (data.is_broadcast !== false) throw new Error('Message should be marked as private')
    if (!data.created_at) throw new Error('Message should have created_at timestamp')
  })

  // Test 18: Carer cannot create messages (403 error)
  await test('POST: Carer cannot create message', async () => {
    const carer = getCarers()[0]
    const messageData = {
      title: 'Test Message',
      body: 'This should fail',
      is_broadcast: true
    }
    
    const { status, data } = await makeApiRequest('POST', { 
      user_id: carer.id,
      body: messageData
    })
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('not a coordinator')) {
      throw new Error(`Expected coordinator error message, got: ${data.message}`)
    }
  })

  // Test 19: Missing required fields
  await test('POST: Missing required fields', async () => {
    const coordinator = getCoordinator()
    const messageData = {
      title: 'Test Message'
      // Missing body and is_broadcast
    }
    
    const { status, data } = await makeApiRequest('POST', { 
      user_id: coordinator.id,
      body: messageData
    })
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('required')) {
      throw new Error(`Expected required fields error message, got: ${data.message}`)
    }
  })

  // Test 20: Private message without carer_id array
  await test('POST: Private message without carer_id array', async () => {
    const coordinator = getCoordinator()
    const messageData = {
      title: 'Test Private Message',
      body: 'This should fail',
      is_broadcast: false
      // Missing carer_id array
    }
    
    const { status, data } = await makeApiRequest('POST', { 
      user_id: coordinator.id,
      body: messageData
    })
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('carer_id array is required')) {
      throw new Error(`Expected carer_id array error message, got: ${data.message}`)
    }
  })

  // Test 21: Private message with empty carer_id array
  await test('POST: Private message with empty carer_id array', async () => {
    const coordinator = getCoordinator()
    const messageData = {
      title: 'Test Private Message',
      body: 'This should fail',
      is_broadcast: false,
      carer_id: []
    }
    
    const { status, data } = await makeApiRequest('POST', { 
      user_id: coordinator.id,
      body: messageData
    })
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('carer_id array is required')) {
      throw new Error(`Expected carer_id array error message, got: ${data.message}`)
    }
  })

  // Test 22: Private message with invalid carer_id (not associated with coordinator)
  await test('POST: Private message with invalid carer_id', async () => {
    const coordinator = getCoordinator()
    const messageData = {
      title: 'Test Private Message',
      body: 'This should fail',
      is_broadcast: false,
      carer_id: ['invalid-carer-id']
    }
    
    const { status, data } = await makeApiRequest('POST', { 
      user_id: coordinator.id,
      body: messageData
    })
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('not associated with this coordinator')) {
      throw new Error(`Expected association error message, got: ${data.message}`)
    }
  })

  // Test 23: Invalid user_id for POST
  await test('POST: Invalid user_id returns 401', async () => {
    const messageData = {
      title: 'Test Message',
      body: 'This should fail',
      is_broadcast: true
    }
    
    const { status, data } = await makeApiRequest('POST', { 
      user_id: 'invalid-id',
      body: messageData
    })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Invalid or unknown user_id')) {
      throw new Error(`Expected invalid user error message, got: ${data.message}`)
    }
  })

  // Test 24: Missing user_id for POST
  await test('POST: Missing user_id parameter', async () => {
    const messageData = {
      title: 'Test Message',
      body: 'This should fail',
      is_broadcast: true
    }
    
    const { status, data } = await makeApiRequest('POST', { 
      body: messageData
    })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('user_id parameter is required')) {
      throw new Error(`Expected missing parameter error message, got: ${data.message}`)
    }
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