import fetch from 'node-fetch'
import bcrypt from 'bcryptjs'
import { TEST_USERS, findUserByUsername } from './test-data.js'
import { pathToFileURL } from 'url'

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'
const API_URL = `${BASE_URL}/api/auth/login`

// Helper function to make API calls
async function makeLoginRequest(username, password) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
  
  const data = await response.json()
  return { status: response.status, data }
}

// Helper function to verify password hash
function verifyPasswordHash(username, password, salt, expectedHash) {
  const saltedPassword = salt + password
  return bcrypt.compareSync(saltedPassword, expectedHash)
}

// Test cases
async function runTests() {
  console.log('🧪 Starting Login Endpoint Tests\n')
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

  // Test 1: Successful login for coordinator
  await test('Coordinator login with valid credentials', async () => {
    const user = findUserByUsername('don')
    const { status, data } = await makeLoginRequest(user.username, user.password)
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (data.status !== 'success') throw new Error(`Expected success status, got ${data.status}`)
    if (!data.profile) throw new Error('Expected profile in response')
    if (data.profile.username !== user.username) throw new Error(`Expected username ${user.username}, got ${data.profile.username}`)
    if (data.profile.role !== user.role) throw new Error(`Expected role ${user.role}, got ${data.profile.role}`)
    if (data.profile.full_name !== user.full_name) throw new Error(`Expected name ${user.full_name}, got ${data.profile.full_name}`)
    if (!data.profile.id) throw new Error('Expected user ID in profile')
  })

  // Test 2: Successful login for carer
  await test('Carer login with valid credentials', async () => {
    const user = findUserByUsername('don')
    const { status, data } = await makeLoginRequest(user.username, user.password)
    
    if (status !== 200) throw new Error(`Expected status 200, got ${status}`)
    if (data.status !== 'success') throw new Error(`Expected success status, got ${data.status}`)
    if (!data.profile) throw new Error('Expected profile in response')
    if (data.profile.username !== user.username) throw new Error(`Expected username ${user.username}, got ${data.profile.username}`)
    if (data.profile.role !== user.role) throw new Error(`Expected role ${user.role}, got ${data.profile.role}`)
    if (data.profile.full_name !== user.full_name) throw new Error(`Expected name ${user.full_name}, got ${data.profile.full_name}`)
  })

  // Test 3: Failed login - user not found
  await test('Login with non-existent username', async () => {
    const { status, data } = await makeLoginRequest('nonexistent', 'password123')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Invalid username or password') throw new Error(`Expected specific error message, got ${data.message}`)
  })

  // Test 4: Failed login - wrong password
  await test('Login with correct username but wrong password', async () => {
    const user = findUserByUsername('don')
    const { status, data } = await makeLoginRequest(user.username, 'wrongpassword')
    
    if (status !== 401) throw new Error(`Expected status 401, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Invalid username or password') throw new Error(`Expected specific error message, got ${data.message}`)
  })

  // Test 5: Missing username
  await test('Login with missing username', async () => {
    const { status, data } = await makeLoginRequest('', 'password123')
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Username and password are required') throw new Error(`Expected specific error message, got ${data.message}`)
  })

  // Test 6: Missing password
  await test('Login with missing password', async () => {
    const user = findUserByUsername('don')
    const { status, data } = await makeLoginRequest(user.username, '')
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Username and password are required') throw new Error(`Expected specific error message, got ${data.message}`)
  })

  // Test 7: Missing both username and password
  await test('Login with missing username and password', async () => {
    const { status, data } = await makeLoginRequest('', '')
    
    if (status !== 400) throw new Error(`Expected status 400, got ${status}`)
    if (data.status !== 'error') throw new Error(`Expected error status, got ${data.status}`)
    if (data.message !== 'Username and password are required') throw new Error(`Expected specific error message, got ${data.message}`)
  })



  // Test 8: Invalid JSON body
  await test('Login with invalid JSON body', async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json'
    })
    
    // Invalid JSON should result in a 400 error (better than 500)
    if (response.status !== 400) throw new Error(`Expected status 400 for invalid JSON, got ${response.status}`)
  })

  // Test 9: One user from each role can login successfully
  await test('One user from each role can login successfully', async () => {
    // Test coordinator (don)
    const coordinator = findUserByUsername('don')
    const { status: coordStatus, data: coordData } = await makeLoginRequest(coordinator.username, coordinator.password)
    if (coordStatus !== 200) throw new Error(`Coordinator ${coordinator.username} login failed with status ${coordStatus}`)
    if (coordData.profile.role !== 'coordinator') throw new Error(`Expected coordinator role, got ${coordData.profile.role}`)
    
    // Test carer (emily)
    const carer = findUserByUsername('emily')
    const { status: carerStatus, data: carerData } = await makeLoginRequest(carer.username, carer.password)
    if (carerStatus !== 200) throw new Error(`Carer ${carer.username} login failed with status ${carerStatus}`)
    if (carerData.profile.role !== 'carer') throw new Error(`Expected carer role, got ${carerData.profile.role}`)
    
    // Test system admin (admin)
    const admin = findUserByUsername('admin')
    const { status: adminStatus, data: adminData } = await makeLoginRequest(admin.username, 'password1234')
    if (adminStatus !== 200) throw new Error(`Admin ${admin.username} login failed with status ${adminStatus}`)
    if (adminData.profile.role !== 'system') throw new Error(`Expected system role, got ${adminData.profile.role}`)
  })

  // Test 10: CORS headers are set
  await test('CORS headers are properly set', async () => {
    const response = await fetch(API_URL, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    // OPTIONS requests should return 200 or 204
    if (![200, 204].includes(response.status)) throw new Error(`Expected status 200 or 204 for OPTIONS, got ${response.status}`)
    
    const corsHeader = response.headers.get('Access-Control-Allow-Origin')
    if (corsHeader !== '*') throw new Error(`Expected CORS header '*', got ${corsHeader}`)
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