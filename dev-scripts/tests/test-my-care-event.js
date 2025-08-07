/**
 * API Tests for POST /my-care-event
 * 
 * Tests the care event creation endpoint for carers.
 * 
 * Test scenarios:
 * 1. Success cases - valid carer creates different event types
 * 2. Authentication failures - missing/invalid user_id
 * 3. Authorization failures - non-carer users
 * 4. Validation failures - missing fields, invalid types, carer_id mismatch
 * 5. Database error handling
 */

import fetch from 'node-fetch'
import { TEST_USERS, findUserByUsername, getCoordinator, getCarers } from './test-data.js'
import { pathToFileURL } from 'url'

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'
const API_URL = `${BASE_URL}/api/my-care-event`

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
  console.log('🧪 Starting POST /my-care-event Tests\n')
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

  // Get test users
  const coordinator = getCoordinator() // Don Smith
  const carers = getCarers() // Emily Davis, Jake Miller
  const carer1 = carers[0] // Emily Davis
  const carer2 = carers[1] // Jake Miller

  // Test 1: Success - Carer creates clock_in event
  await test('Success - Carer creates clock_in event', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: carer1.id,
      body: {
        carer_id: carer1.id,
        event_type: 'clock_in',
        notes: 'Starting morning shift'
      }
    })
    
    if (status !== 201) throw new Error(`Expected status 201, got ${status}`)
    if (!data.id) throw new Error('Expected care event ID in response')
    if (data.carer_id !== carer1.id) throw new Error('Expected carer_id to match')
    if (data.event_type !== 'clock_in') throw new Error('Expected event_type to be clock_in')
    if (data.notes !== 'Starting morning shift') throw new Error('Expected notes to match')
    if (!data.event_time) throw new Error('Expected event_time in response')
  })

  // Test 2: Success - Carer creates clock_out event
  await test('Success - Carer creates clock_out event', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: carer2.id,
      body: {
        carer_id: carer2.id,
        event_type: 'clock_out',
        notes: 'Ending afternoon shift'
      }
    })
    
    if (status !== 201) throw new Error(`Expected status 201, got ${status}`)
    if (!data.id) throw new Error('Expected care event ID in response')
    if (data.carer_id !== carer2.id) throw new Error('Expected carer_id to match')
    if (data.event_type !== 'clock_out') throw new Error('Expected event_type to be clock_out')
    if (data.notes !== 'Ending afternoon shift') throw new Error('Expected notes to match')
  })

  // Test 3: Success - Carer creates medication event
  await test('Success - Carer creates medication event', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: carer1.id,
      body: {
        carer_id: carer1.id,
        event_type: 'medication',
        notes: 'Administered morning medication'
      }
    })
    
    if (status !== 201) throw new Error(`Expected status 201, got ${status}`)
    if (!data.id) throw new Error('Expected care event ID in response')
    if (data.event_type !== 'medication') throw new Error('Expected event_type to be medication')
  })

  // Test 4: Success - Carer creates exercise event
  await test('Success - Carer creates exercise event', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: carer2.id,
      body: {
        carer_id: carer2.id,
        event_type: 'exercise',
        notes: 'Morning stretching routine'
      }
    })
    
    if (status !== 201) throw new Error(`Expected status 201, got ${status}`)
    if (!data.id) throw new Error('Expected care event ID in response')
    if (data.event_type !== 'exercise') throw new Error('Expected event_type to be exercise')
  })

  // Test 5: Success - Carer creates bowel_movement event
  await test('Success - Carer creates bowel_movement event', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: carer1.id,
      body: {
        carer_id: carer1.id,
        event_type: 'bowel_movement',
        notes: 'Regular bowel movement recorded'
      }
    })
    
    if (status !== 201) throw new Error(`Expected status 201, got ${status}`)
    if (!data.id) throw new Error('Expected care event ID in response')
    if (data.event_type !== 'bowel_movement') throw new Error('Expected event_type to be bowel_movement')
  })

  // Test 6: Success - Carer creates event without notes
  await test('Success - Carer creates event without notes', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: carer2.id,
      body: {
        carer_id: carer2.id,
        event_type: 'clock_in'
      }
    })
    
    if (status !== 201) throw new Error(`Expected status 201, got ${status}`)
    if (!data.id) throw new Error('Expected care event ID in response')
    if (data.notes !== null) throw new Error('Expected notes to be null when not provided')
  })

  // Test 7: Authentication failure - Missing user_id
  await test('Authentication failure - Missing user_id', async () => {
    const { status, data } = await makeApiRequest('POST', {
      body: {
        carer_id: carer1.id,
        event_type: 'clock_in'
      }
    })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('user_id parameter is required')) throw new Error('Expected specific error message')
  })

  // Test 8: Authentication failure - Invalid user_id
  await test('Authentication failure - Invalid user_id', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: 'invalid-uuid-123',
      body: {
        carer_id: carer1.id,
        event_type: 'clock_in'
      }
    })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Invalid or unknown user_id')) throw new Error('Expected specific error message')
  })

  // Test 9: Authorization failure - Coordinator tries to create care event
  await test('Authorization failure - Coordinator tries to create care event', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: coordinator.id,
      body: {
        carer_id: coordinator.id,
        event_type: 'clock_in'
      }
    })
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('User is not a carer')) throw new Error('Expected specific error message')
  })

  // Test 10: Validation failure - Missing carer_id
  await test('Validation failure - Missing carer_id', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: carer1.id,
      body: {
        event_type: 'clock_in'
      }
    })
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('carer_id and event_type are required')) throw new Error('Expected specific error message')
  })

  // Test 11: Validation failure - Missing event_type
  await test('Validation failure - Missing event_type', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: carer1.id,
      body: {
        carer_id: carer1.id
      }
    })
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('carer_id and event_type are required')) throw new Error('Expected specific error message')
  })

  // Test 12: Validation failure - Invalid event_type
  await test('Validation failure - Invalid event_type', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: carer1.id,
      body: {
        carer_id: carer1.id,
        event_type: 'invalid_event'
      }
    })
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Invalid event_type')) throw new Error('Expected specific error message')
    if (!data.message.includes('clock_in, clock_out, exercise, medication, bowel_movement')) throw new Error('Expected valid event types in error message')
  })

  // Test 13: Validation failure - carer_id mismatch
  await test('Validation failure - carer_id mismatch', async () => {
    const { status, data } = await makeApiRequest('POST', {
      user_id: carer1.id,
      body: {
        carer_id: carer2.id, // Different carer ID
        event_type: 'clock_in'
      }
    })
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('carer_id must match the authenticated user')) throw new Error('Expected specific error message')
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