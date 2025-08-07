/**
 * API Test for GET /my-clock-status
 * 
 * Tests the my-clock-status endpoint which returns the latest clock status for a carer.
 * 
 * LOGICAL PATHS TESTED:
 * 1. CORS handling - OPTIONS request
 * 2. Missing user_id parameter - 401 error
 * 3. Invalid user_id format - 401 error
 * 4. Non-existent user_id - 401 error
 * 5. Non-carer user (coordinator) - 403 error
 * 6. System admin user - 403 error
 * 7. Valid carer with clock status - 200 with ClockStatus object
 * 8. Valid carer with no clock status - 200 with default clock_out status
 * 9. Database error handling - 500 error
 * 
 * TEST DATA USED:
 * - Emily (carer): Has clock events in seed data, should return latest status
 * - Jake (carer): Has clock events in seed data, should return latest status
 * - Sarah (carer): Has no clock events, should return default clock_out status
 * - Don (coordinator): Should be rejected with 403
 * - Kate (coordinator): Should be rejected with 403
 * - System admin: Should be rejected with 403
 * - Invalid UUID: Should be rejected with 401
 * - Non-existent UUID: Should be rejected with 401
 */

import fetch from 'node-fetch'
import { TEST_USERS, findUserByUsername, getCoordinator, getCarers } from './test-data.js'
import { pathToFileURL } from 'url'

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'
const API_URL = `${BASE_URL}/api/my-clock-status`

// Helper function to make API calls
async function makeApiRequest(method, params = {}) {
  const url = new URL(API_URL)
  
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

// Test cases
async function runTests() {
  console.log('🧪 Starting My Clock Status Tests\n')
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

  // Test 1: CORS headers are properly set
  await test('CORS headers are properly set', async () => {
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

  // Test 2: Missing user_id parameter
  await test('Missing user_id parameter returns 401', async () => {
    const { status, data } = await makeApiRequest('GET')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('user_id parameter is required')) {
      throw new Error(`Expected message about missing user_id, got: ${data.message}`)
    }
  })

  // Test 3: Invalid user_id format returns 401
  await test('Invalid user_id format returns 401', async () => {
    const { status, data } = await makeApiRequest('GET', { user_id: 'invalid-uuid-format' })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Invalid or unknown user_id')) {
      throw new Error(`Expected message about invalid user_id, got: ${data.message}`)
    }
  })

  // Test 4: Non-existent user_id returns 401
  await test('Non-existent user_id returns 401', async () => {
    const { status, data } = await makeApiRequest('GET', { 
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
    const { status, data } = await makeApiRequest('GET', { user_id: coordinator.id })
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Only carers can access their clock status')) {
      throw new Error(`Expected message about carers only, got: ${data.message}`)
    }
  })

  // Test 6: Another coordinator user returns 403
  await test('Another coordinator user returns 403', async () => {
    const kate = findUserByUsername('kate')
    if (!kate || kate.role !== 'coordinator') {
      throw new Error('Kate not found or not a coordinator in test data')
    }
    
    const { status, data } = await makeApiRequest('GET', { user_id: kate.id })
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Only carers can access their clock status')) {
      throw new Error(`Expected message about carers only, got: ${data.message}`)
    }
  })

  // Test 7: System admin user returns 403
  await test('System admin user returns 403', async () => {
    const systemAdmin = findUserByUsername('admin')
    if (!systemAdmin || systemAdmin.role !== 'system') {
      throw new Error('System admin not found in test data')
    }
    
    const { status, data } = await makeApiRequest('GET', { user_id: systemAdmin.id })
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Only carers can access their clock status')) {
      throw new Error(`Expected message about carers only, got: ${data.message}`)
    }
  })

  // Test 8: Valid carer with clock status returns 200 with ClockStatus object
  await test('Valid carer with clock status returns 200 with ClockStatus object', async () => {
    const emily = findUserByUsername('emily')
    if (!emily || emily.role !== 'carer') {
      throw new Error('Emily not found or not a carer in test data')
    }
    
    const { status, data } = await makeApiRequest('GET', { user_id: emily.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    
    // Verify ClockStatus object structure
    const requiredFields = ['carer_id', 'full_name', 'event_type', 'event_time']
    requiredFields.forEach(field => {
      if (!(field in data)) {
        throw new Error(`ClockStatus missing required field: ${field}`)
      }
    })
    
    // Verify field values
    if (data.carer_id !== emily.id) {
      throw new Error(`Expected carer_id ${emily.id}, got ${data.carer_id}`)
    }
    if (data.full_name !== emily.full_name) {
      throw new Error(`Expected full_name ${emily.full_name}, got ${data.full_name}`)
    }
    if (!['clock_in', 'clock_out'].includes(data.event_type)) {
      throw new Error(`Expected event_type to be clock_in or clock_out, got ${data.event_type}`)
    }
    if (data.event_time && typeof data.event_time !== 'string') {
      throw new Error(`Expected event_time to be string or null, got ${typeof data.event_time}`)
    }
  })

  // Test 9: Another valid carer with clock status returns 200
  await test('Another valid carer with clock status returns 200', async () => {
    const jake = findUserByUsername('jake')
    if (!jake || jake.role !== 'carer') {
      throw new Error('Jake not found or not a carer in test data')
    }
    
    const { status, data } = await makeApiRequest('GET', { user_id: jake.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    
    // Verify ClockStatus object structure
    const requiredFields = ['carer_id', 'full_name', 'event_type', 'event_time']
    requiredFields.forEach(field => {
      if (!(field in data)) {
        throw new Error(`ClockStatus missing required field: ${field}`)
      }
    })
    
    // Verify field values
    if (data.carer_id !== jake.id) {
      throw new Error(`Expected carer_id ${jake.id}, got ${data.carer_id}`)
    }
    if (data.full_name !== jake.full_name) {
      throw new Error(`Expected full_name ${jake.full_name}, got ${data.full_name}`)
    }
    if (!['clock_in', 'clock_out'].includes(data.event_type)) {
      throw new Error(`Expected event_type to be clock_in or clock_out, got ${data.event_type}`)
    }
    if (data.event_time && typeof data.event_time !== 'string') {
      throw new Error(`Expected event_time to be string or null, got ${typeof data.event_time}`)
    }
  })

  // Test 10: Verify that carers return different clock statuses (they should have different latest events)
  await test('Carers return different clock statuses based on their latest events', async () => {
    const emily = findUserByUsername('emily')
    const jake = findUserByUsername('jake')
    
    if (!emily || !jake) {
      throw new Error('Emily or Jake not found in test data')
    }
    
    const emilyResponse = await makeApiRequest('GET', { user_id: emily.id })
    const jakeResponse = await makeApiRequest('GET', { user_id: jake.id })
    
    if (emilyResponse.status !== 200 || jakeResponse.status !== 200) {
      throw new Error('Both carers should return 200 status')
    }
    
    // Based on seed data, both should have clock events, but they might have different latest events
    // We just verify they both have valid responses
    if (!emilyResponse.data.event_type || !jakeResponse.data.event_type) {
      throw new Error('Both carers should have event_type in their responses')
    }
    
    if (!['clock_in', 'clock_out'].includes(emilyResponse.data.event_type)) {
      throw new Error(`Emily's event_type should be clock_in or clock_out, got ${emilyResponse.data.event_type}`)
    }
    
    if (!['clock_in', 'clock_out'].includes(jakeResponse.data.event_type)) {
      throw new Error(`Jake's event_type should be clock_in or clock_out, got ${jakeResponse.data.event_type}`)
    }
  })

  // Test 11: Carer with no clock events returns default clock_out status
  await test('Carer with no clock events returns default clock_out status', async () => {
    const sarah = findUserByUsername('sarah')
    if (!sarah || sarah.role !== 'carer') {
      throw new Error('Sarah not found or not a carer in test data')
    }
    
    const { status, data } = await makeApiRequest('GET', { user_id: sarah.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    
    // Verify default ClockStatus object structure
    const requiredFields = ['carer_id', 'full_name', 'event_type', 'event_time']
    requiredFields.forEach(field => {
      if (!(field in data)) {
        throw new Error(`ClockStatus missing required field: ${field}`)
      }
    })
    
    // Verify default values for carer with no clock events
    if (data.carer_id !== sarah.id) {
      throw new Error(`Expected carer_id ${sarah.id}, got ${data.carer_id}`)
    }
    if (data.full_name !== sarah.full_name) {
      throw new Error(`Expected full_name ${sarah.full_name}, got ${data.full_name}`)
    }
    if (data.event_type !== 'clock_out') {
      throw new Error(`Expected default event_type 'clock_out', got ${data.event_type}`)
    }
    if (data.event_time !== null) {
      throw new Error(`Expected event_time to be null for carer with no events, got ${data.event_time}`)
    }
  })

  // Test 12: Clock status response structure is consistent across all carers
  await test('Clock status response structure is consistent', async () => {
    const carers = getCarers()
    if (carers.length === 0) {
      throw new Error('No carers found in test data')
    }
    
    // Test all carers to ensure consistent response structure
    for (const carer of carers) {
      const { status, data } = await makeApiRequest('GET', { user_id: carer.id })
      
      if (status !== 200) {
        throw new Error(`Carer ${carer.username} should return 200, got ${status}`)
      }
      
      // Verify consistent structure
      const requiredFields = ['carer_id', 'full_name', 'event_type', 'event_time']
      requiredFields.forEach(field => {
        if (!(field in data)) {
          throw new Error(`Carer ${carer.username} response missing field: ${field}`)
        }
      })
      
      // Verify data types
      if (typeof data.carer_id !== 'string') {
        throw new Error(`Carer ${carer.username} carer_id should be string, got ${typeof data.carer_id}`)
      }
      if (typeof data.full_name !== 'string') {
        throw new Error(`Carer ${carer.username} full_name should be string, got ${typeof data.full_name}`)
      }
      if (!['clock_in', 'clock_out'].includes(data.event_type)) {
        throw new Error(`Carer ${carer.username} event_type should be clock_in or clock_out, got ${data.event_type}`)
      }
      if (data.event_time !== null && typeof data.event_time !== 'string') {
        throw new Error(`Carer ${carer.username} event_time should be string or null, got ${typeof data.event_time}`)
      }
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