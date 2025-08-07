// Simple test script for API endpoints
// Run with: node test-api.js

const API_BASE = 'http://localhost:3001/api'

async function testAPI() {
  console.log('🧪 Testing BFF-DB Workflow...\n')

  try {
    // Test 1: Check API connection
    console.log('1. Testing API connection...')
    const testResponse = await fetch(`${API_BASE}/test`)
    const testData = await testResponse.json()
    console.log('✅', testData.message)
    console.log('   Database:', testData.database)
    console.log('   Timestamp:', testData.timestamp)
    console.log('')

    // Test 2: Test new users endpoint (should work with our simple auth system)
    console.log('2. Testing new users endpoint...')
    const usersResponse = await fetch(`${API_BASE}/users`)
    
    if (usersResponse.ok) {
      const usersData = await usersResponse.json()
      console.log('✅ Users endpoint:', usersResponse.status, usersResponse.statusText)
      console.log('   Found', usersData.length, 'users in database')
      if (usersData.length > 0) {
        console.log('   Sample user:', usersData[0].username, '-', usersData[0].full_name)

        // Test 3: Test /users/:id endpoint
        const userId = 2
        // const userId = usersData[0].id
        console.log(`3. Testing /users/${userId} endpoint...`)
        const userByIdResponse = await fetch(`${API_BASE}/users/${userId}`)
        
        // Check status code first
        if (userByIdResponse.status !== 200) {
          console.log(`❌ /users/:id wrong status: ${userByIdResponse.status} (expected 200)`)
          const errorData = await userByIdResponse.json()
          console.log('   Error:', errorData.error || errorData.message || 'Unknown error')
          return
        }
        
        // Check response format
        const userByIdData = await userByIdResponse.json()
        if (Array.isArray(userByIdData)) {
          console.log('❌ /users/:id returned an array instead of single object')
          console.log('   Response:', userByIdData)
          return
        }
        
        if (!userByIdData || typeof userByIdData !== 'object') {
          console.log('❌ /users/:id did not return a valid object')
          console.log('   Response:', userByIdData)
          return
        }
        
        // Check ID matches
        if (userByIdData.id !== userId) {
          console.log(`❌ /users/:id returned wrong user ID: ${userByIdData.id} (expected ${userId})`)
          console.log('   Response:', userByIdData)
          return
        }
        
        // All checks passed
        console.log('✅ /users/:id endpoint: 200 OK')
        console.log('   User:', userByIdData.username, '-', userByIdData.full_name)
        console.log('   ID matches:', userByIdData.id)
      }
    } else {
      const errorData = await usersResponse.json()
      console.log('❌ Users endpoint error:', usersResponse.status, usersResponse.statusText)
      console.log('   Error:', errorData.error || errorData.message || 'Unknown error')
    }

    // Test 4: POST - Create a new user
    console.log('\n4. Testing POST /users - Create new user...')
    const newUser = {
      username: `testuser_${Date.now()}`,
      password: 'password123',
      full_name: 'Test User for API',
      role: 'Carer'
    }
    
    const createResponse = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    
    // Check status code
    if (createResponse.status !== 201) {
      console.log(`❌ POST /users wrong status: ${createResponse.status} (expected 201)`)
      const errorData = await createResponse.json()
      console.log('   Error:', errorData.error || errorData.message || 'Unknown error')
      return
    }
    
    // Check response body
    const createdUser = await createResponse.json()
    if (!createdUser || typeof createdUser !== 'object') {
      console.log('❌ POST /users did not return a valid object')
      console.log('   Response:', createdUser)
      return
    }
    
    if (!createdUser.id || createdUser.username !== newUser.username || createdUser.full_name !== newUser.full_name) {
      console.log('❌ POST /users returned incorrect user data')
      console.log('   Expected username:', newUser.username)
      console.log('   Got username:', createdUser.username)
      console.log('   Response:', createdUser)
      return
    }
    
    console.log('✅ POST /users: 201 Created')
    console.log('   Created user ID:', createdUser.id)
    console.log('   Username:', createdUser.username)
    console.log('   Full name:', createdUser.full_name)
    console.log('   Role:', createdUser.role)

    // Test 5: DELETE - Delete the created user
    console.log(`\n5. Testing DELETE /users/${createdUser.id} - Delete user...`)
    const deleteResponse = await fetch(`${API_BASE}/users/${createdUser.id}`, {
      method: 'DELETE'
    })
    
    // Check status code
    if (deleteResponse.status !== 204) {
      console.log(`❌ DELETE /users/:id wrong status: ${deleteResponse.status} (expected 204)`)
      const errorData = await deleteResponse.json()
      console.log('   Error:', errorData.error || errorData.message || 'Unknown error')
      return
    }
    
    console.log('✅ DELETE /users/:id: 204 No Content')

    // Test 6: Verify user no longer exists
    console.log(`\n6. Testing GET /users/${createdUser.id} - Verify user deleted...`)
    const verifyResponse = await fetch(`${API_BASE}/users/${createdUser.id}`)
    
    // Check status code - should be 404
    if (verifyResponse.status !== 404) {
      console.log(`❌ GET /users/:id wrong status: ${verifyResponse.status} (expected 404)`)
      const errorData = await verifyResponse.json()
      console.log('   Response:', errorData)
      return
    }
    
    const errorData = await verifyResponse.json()
    if (!errorData.error || !errorData.error.includes('not found')) {
      console.log('❌ GET /users/:id did not return expected error message')
      console.log('   Response:', errorData)
      return
    }
    
    console.log('✅ GET /users/:id: 404 Not Found (user successfully deleted)')
    console.log('   Error message:', errorData.error)

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testAPI() 