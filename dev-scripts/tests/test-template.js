/**
 * API Test Template
 * 
 * This template provides a standardized way to write API endpoint tests.
 * Copy this file and customize it for your specific endpoint.
 * 
 * QUICK START:
 * 1. Copy this file: cp test-template.js test-your-endpoint.js
 * 2. Change API_URL to your endpoint
 * 3. Import the test data you need from ./test-data.js
 * 4. Customize makeApiRequest() for your endpoint's needs
 * 5. Add your specific test cases
 * 
 * SHARED TEST DATA:
 * All tests use shared test data from test-data.js to ensure consistency:
 * 
 * Available imports:
 * - TEST_USERS: All test users with passwords
 * - TEST_CARE_RECIPIENTS: Care recipients
 * - TEST_MESSAGES: Messages
 * - TEST_MESSAGE_RECIPIENTS: Message recipients
 * - TEST_MESSAGE_ACKNOWLEDGEMENTS: Message acknowledgements
 * - generateCareEvents(): Function to generate care events
 * - findUserByUsername(username): Helper to find user by username
 * - findUserById(id): Helper to find user by ID
 * - getCoordinator(): Helper to get coordinator user
 * - getCarers(): Helper to get all carers
 * 
 * BEST PRACTICES:
 * 1. Always use async test functions and await test calls
 * 2. Always export { runTests } at the end
 * 3. Use shared test data instead of hardcoding values
 * 4. Test real server behavior, not assumptions
 * 5. Include standard tests: basic functionality, error handling, missing parameters
 * 
 * IMPLEMENTATION REQUIREMENTS:
 * - Use async test functions and await test calls
 * - Always export { runTests } at the end
 * - Use shared test data from dev-scripts/tests/test-data.js instead of hardcoding values
 * - Include standard tests: basic functionality, error handling, missing parameters
 * - Test real server behavior, not assumptions
 * - IMPORTANT: Keep the ES module entry point check at the bottom of the file
 * 
 * COMMON PATTERNS:
 * 
 * GET Request with Parameters:
 * const { status, data } = await makeApiRequest('GET', { 
 *   user_id: coordinator.id,
 *   param2: 'value2' 
 * })
 * 
 * POST Request with Body:
 * const { status, data } = await makeApiRequest('POST', {
 *   body: { username: 'test', password: 'test123' }
 * })
 * 
 * Testing Error Responses:
 * if (status !== 401) throw new Error(`Expected 401, got ${status}`)
 * if (data.status !== 'error') throw new Error(`Expected error status`)
 * 
 * Using Test Data Helpers:
 * const coordinator = getCoordinator()
 * const carer = getCarers()[0]
 * const user = findUserByUsername('don')
 * 
 * INTEGRATION:
 * To add your test to the main test runner:
 * 1. Add import to run-tests.js: import { runTests as runYourTests } from './test-your-endpoint.js'
 * 2. Add to test sequence: await runYourTests()
 * 
 * TROUBLESHOOTING:
 * - No output when running 'node test-file.js': Check that you have the correct ES module entry point check at the bottom of the file
 * - Import errors: Make sure you have export { runTests } at the end
 * - Test failures: Use curl to verify the actual API behavior first
 * - Data not found: Check that you're importing the correct data from test-data.js
 * - ES Module entry point: The template includes the correct pattern using pathToFileURL(process.argv[1]).href
 */

import fetch from 'node-fetch'
import { TEST_USERS, findUserByUsername, getCoordinator, getCarers } from './test-data.js'
import { pathToFileURL } from 'url'

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'
const API_URL = `${BASE_URL}/api/your-endpoint` // Change this to your endpoint

// Helper function to make API calls - customize for your endpoint
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
  console.log('🧪 Starting Your Endpoint Tests\n')
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

  // Test 1: Basic functionality test
  await test('Basic functionality test', async () => {
    const coordinator = getCoordinator()
    const { status, data } = await makeApiRequest('GET', { user_id: coordinator.id })
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!data) throw new Error('Expected data in response')
    // Add your specific assertions here
  })

  // Test 2: Error handling test
  await test('Error handling test', async () => {
    const { status, data } = await makeApiRequest('GET', { user_id: 'invalid-id' })
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
  })

  // Test 3: Missing required parameters
  await test('Missing required parameters', async () => {
    const { status, data } = await makeApiRequest('GET')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
  })

  // Add more tests as needed...

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