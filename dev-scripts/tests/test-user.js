import fetch from 'node-fetch'
import { TEST_USERS, findUserById, getCoordinator, getCarers } from './test-data.js'
import { pathToFileURL } from 'url'

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'
const API_URL = `${BASE_URL}/api/user`

// Helper function to make API calls
async function makeUsersRequest(method, user_id) {
  const url = `${API_URL}?user_id=${user_id}`
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  
  const response = await fetch(url, options)
  const data = await response.json()
  return { status: response.status, data }
}

// Helper function to make requests without user_id (for testing missing parameter)
async function makeUsersRequestWithoutUserId(method) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  
  const response = await fetch(API_URL, options)
  const data = await response.json()
  return { status: response.status, data }
}

// Helper function to make requests with invalid user_id
async function makeUsersRequestWithInvalidUserId(method, invalid_user_id) {
  const url = `${API_URL}?user_id=${invalid_user_id}`
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  
  const response = await fetch(url, options)
  const data = await response.json()
  return { status: response.status, data }
}

// Test cases
async function runTests() {
  console.log('🧪 Starting Users Endpoint Tests\n')
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

  // Test 1: GET users - system user (admin) access (success) - can see all users
  await test('System user (admin) can get all users', async () => {
    const adminUserId = 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa' // admin user from seed data
    const { status, data } = await makeUsersRequest('GET', adminUserId)
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array response')
    if (data.length !== 6) throw new Error(`Expected 6 users, got ${data.length}`)
    
    // Verify we have the expected number of users (count check only)
    
    // Verify user structure
    const firstUser = data.find(u => u.username === 'don')
    if (!firstUser.id) throw new Error('Expected user ID')
    if (!firstUser.username) throw new Error('Expected username')
    if (!firstUser.full_name) throw new Error('Expected full_name')
    if (!firstUser.role) throw new Error('Expected role')
    if (!firstUser.created_at) throw new Error('Expected created_at')
  })

  // Test 2: GET users - coordinator access (success) - can only see their carers
  await test('Coordinator can get their associated carers', async () => {
    const coordinator = getCoordinator() // don
    const { status, data } = await makeUsersRequest('GET', coordinator.id)
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array response')
    if (data.length !== 3) throw new Error(`Expected 3 carers, got ${data.length}`)
    
    // Verify all returned users are carers
    for (const user of data) {
      if (user.role !== 'carer') {
        throw new Error(`Expected all users to be carers, got ${user.role}`)
      }
    }
  })

  // Test 3: GET users - carer access (forbidden)
  await test('Carer cannot get users', async () => {
    const carer = getCarers()[0] // emily
    const { status, data } = await makeUsersRequest('GET', carer.id)
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Carers cannot view user data') {
      throw new Error(`Expected specific error message, got ${data.message}`)
    }
  })

  // Test 4: GET users - missing user_id parameter
  await test('GET request without user_id parameter', async () => {
    const { status, data } = await makeUsersRequestWithoutUserId('GET')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'user_id parameter is required') {
      throw new Error(`Expected specific error message, got ${data.message}`)
    }
  })

  // Test 5: GET users - invalid user_id
  await test('GET request with invalid user_id', async () => {
    const { status, data } = await makeUsersRequestWithInvalidUserId('GET', 'invalid-uuid')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Invalid or unknown user_id') {
      throw new Error(`Expected specific error message, got ${data.message}`)
    }
  })

  // Test 6: GET users - non-existent user_id
  await test('GET request with non-existent user_id', async () => {
    const { status, data } = await makeUsersRequestWithInvalidUserId('GET', '99999999-9999-9999-9999-999999999999')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Invalid or unknown user_id') {
      throw new Error(`Expected specific error message, got ${data.message}`)
    }
  })

  // Test 7: CORS headers are set
  await test('CORS headers are properly set', async () => {
    const coordinator = getCoordinator()
    
    const response = await fetch(`${API_URL}?user_id=${coordinator.id}`, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (![200, 204].includes(response.status)) throw new Error(`Expected status 200 or 204 for OPTIONS, got ${response.status}`)
    
    const corsHeader = response.headers.get('Access-Control-Allow-Origin')
    if (corsHeader !== '*') throw new Error(`Expected CORS header '*', got ${corsHeader}`)
  })

  // Test 8: Verify coordinator can see their specific carers
  await test('Coordinator can see their specific carers', async () => {
    const coordinator = getCoordinator() // don
    const { status, data } = await makeUsersRequest('GET', coordinator.id)
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (!Array.isArray(data)) throw new Error('Expected array response')
    
    // Verify specific carers are present with correct data
    const emily = data.find(u => u.username === 'emily')
    const jake = data.find(u => u.username === 'jake')
    
    if (!emily) throw new Error('Expected carer emily not found')
    if (!jake) throw new Error('Expected carer jake not found')
    
    if (emily.full_name !== 'Emily Davis') {
      throw new Error(`Expected full_name Emily Davis, got ${emily.full_name}`)
    }
    if (jake.full_name !== 'Jake Miller') {
      throw new Error(`Expected full_name Jake Miller, got ${jake.full_name}`)
    }
    
    if (emily.role !== 'carer') {
      throw new Error(`Expected role carer, got ${emily.role}`)
    }
    if (jake.role !== 'carer') {
      throw new Error(`Expected role carer, got ${jake.role}`)
    }
  })

  // Test 9: Test with another carer (should also be forbidden)
  await test('Another carer cannot get users', async () => {
    const carer = getCarers()[1] // jake
    const { status, data } = await makeUsersRequest('GET', carer.id)
    
    if (status !== 403) throw new Error(`Expected status 403, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Carers cannot view user data') {
      throw new Error(`Expected specific error message, got ${data.message}`)
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