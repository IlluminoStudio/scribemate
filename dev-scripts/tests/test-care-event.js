/**
 * Care Event API Tests
 * 
 * Tests the /api/care-event/today endpoint for coordinators to view today's care events
 * from their carers.
 */

import fetch from 'node-fetch'
import { getCoordinator, getKateJones, getCarers, findUserByUsername } from './test-data.js'
import { pathToFileURL } from 'url'

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'
const API_URL = `${BASE_URL}/api/care-event/today`

// Helper function to make API calls
async function makeApiRequest(user_id) {
  const url = new URL(API_URL)
  
  if (user_id) {
    url.searchParams.append('user_id', user_id)
  }
  
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  
  const data = await response.json()
  return { status: response.status, data }
}

// Test cases
async function runTests() {
  console.log('🧪 Starting Care Event API Tests\n')
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

  // Test 1: Coordinator can view care events successfully
  await test('Coordinator can view care events successfully', async () => {
    const coordinator = getCoordinator() // Don Smith
    const { status, data } = await makeApiRequest(coordinator.id)
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array of care events')
    
    // Should have care events from Emily and Jake (Don's carers)
    if (data.length === 0) throw new Error('Expected care events for coordinator')
    
    // Verify event structure
    const firstEvent = data[0]
    if (!firstEvent.id) throw new Error('Care event missing id')
    if (!firstEvent.carer_id) throw new Error('Care event missing carer_id')
    if (!firstEvent.event_type) throw new Error('Care event missing event_type')
    // Notes are optional, so we don't check for them
    if (!firstEvent.event_time) throw new Error('Care event missing event_time')
    
    // Verify all events are from Don's carers (Emily and Jake)
    const validCarerIds = ['22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333']
    const invalidEvents = data.filter(event => !validCarerIds.includes(event.carer_id))
    if (invalidEvents.length > 0) {
      throw new Error(`Found events from unauthorized carers: ${invalidEvents.map(e => e.carer_id).join(', ')}`)
    }
  })

  // Test 2: Another coordinator can view their care events
  await test('Another coordinator can view their care events', async () => {
    const coordinator = getKateJones() // Kate Jones
    const { status, data } = await makeApiRequest(coordinator.id)
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array of care events')
    
    // Kate should have no care events since her carers have no events in seed data
    // This is expected behavior - empty array is valid
  })

  // Test 3: Missing user_id parameter
  await test('Missing user_id parameter returns 401', async () => {
    const { status, data } = await makeApiRequest()
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'user_id parameter is required') {
      throw new Error(`Expected specific error message, got: ${data.message}`)
    }
  })

  // Test 4: Invalid user_id format
  await test('Invalid user_id format returns 401', async () => {
    const { status, data } = await makeApiRequest('invalid-uuid')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Invalid or unknown user_id') {
      throw new Error(`Expected specific error message, got: ${data.message}`)
    }
  })

  // Test 5: Non-existent user_id
  await test('Non-existent user_id returns 401', async () => {
    const { status, data } = await makeApiRequest('99999999-9999-9999-9999-999999999999')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Invalid or unknown user_id') {
      throw new Error(`Expected specific error message, got: ${data.message}`)
    }
  })

  // Test 6: Carer cannot access care events
  await test('Carer cannot access care events', async () => {
    const carers = getCarers()
    const carer = carers[0] // Emily Davis
    const { status, data } = await makeApiRequest(carer.id)
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Only coordinators may view care events') {
      throw new Error(`Expected specific error message, got: ${data.message}`)
    }
  })

  // Test 7: System admin cannot access care events
  await test('System admin cannot access care events', async () => {
    const admin = findUserByUsername('admin')
    const { status, data } = await makeApiRequest(admin.id)
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Only coordinators may view care events') {
      throw new Error(`Expected specific error message, got: ${data.message}`)
    }
  })

  // Test 8: Empty string user_id
  await test('Empty string user_id returns 401', async () => {
    const { status, data } = await makeApiRequest('')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'user_id parameter is required') {
      throw new Error(`Expected specific error message, got: ${data.message}`)
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