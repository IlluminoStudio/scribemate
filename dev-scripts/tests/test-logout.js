/**
 * Logout Endpoint Tests
 * 
 * Tests the POST /api/auth/logout endpoint
 * 
 * Endpoint: POST /api/auth/logout?user_id=<user_id>
 * 
 * Expected behavior:
 * - Validates user_id parameter
 * - Verifies user exists in view_current_user_profile
 * - Logs logout event to user_event_logs
 * - Returns success response with logged_out_at timestamp
 */

import fetch from 'node-fetch'
import { TEST_USERS, findUserByUsername, getCoordinator, getCarers } from './test-data.js'
import { pathToFileURL } from 'url'

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'
const API_URL = `${BASE_URL}/api/auth/logout`

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
  
  const response = await fetch(url.toString(), options)
  const data = await response.json()
  return { status: response.status, data }
}

// Test cases
async function runTests() {
  console.log('🧪 Starting Logout Endpoint Tests\n')
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

  // Test 1: Successful logout for coordinator
  await test('Successful logout for coordinator', async () => {
    const coordinator = getCoordinator()
    const { status, data } = await makeApiRequest('POST', { user_id: coordinator.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (data.status !== 'success') throw new Error(`Expected success status, got ${data.status}`)
    if (!data.logged_out_at) throw new Error('Expected logged_out_at timestamp')
    
    // Verify timestamp is recent (within last 5 seconds)
    const logoutTime = new Date(data.logged_out_at)
    const now = new Date()
    const timeDiff = Math.abs(now - logoutTime) / 1000
    if (timeDiff > 5) throw new Error(`Logout time too old: ${timeDiff}s ago`)
  })

  // Test 2: Successful logout for carer
  await test('Successful logout for carer', async () => {
    const carer = getCarers()[0]
    const { status, data } = await makeApiRequest('POST', { user_id: carer.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (data.status !== 'success') throw new Error(`Expected success status, got ${data.status}`)
    if (!data.logged_out_at) throw new Error('Expected logged_out_at timestamp')
  })

  // Test 3: Missing user_id parameter
  await test('Missing user_id parameter', async () => {
    const { status, data } = await makeApiRequest('POST')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('user_id')) throw new Error('Expected error message about user_id')
  })

  // Test 4: Invalid user_id
  await test('Invalid user_id', async () => {
    const { status, data } = await makeApiRequest('POST', { user_id: 'invalid-id' })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (!data.message.includes('Invalid or unknown user_id')) throw new Error('Expected error message about invalid user_id')
  })

  // Test 5: CORS headers
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

  // Test 6: Empty user_id parameter
  await test('Empty user_id parameter', async () => {
    const { status, data } = await makeApiRequest('POST', { user_id: '' })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
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