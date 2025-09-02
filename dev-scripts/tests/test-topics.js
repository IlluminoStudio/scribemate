import fetch from 'node-fetch'

// Test the suggest topics endpoint
async function testSuggestEndpoint() {
  const testData = {
    industry: "private piano teaching"
  }

  try {
    console.log('🧪 Testing /api/v1/topics:suggest endpoint...')
    console.log('📤 Sending request:', JSON.stringify(testData, null, 2))

    const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    })

    console.log('📥 Response status:', response.status)
    
    const responseData = await response.json()
    console.log('📥 Response data:', JSON.stringify(responseData, null, 2))

    if (response.ok) {
      console.log('✅ Test passed! Endpoint is working correctly.')
    } else {
      console.log('❌ Test failed! Check the error above.')
    }

  } catch (error) {
    console.error('❌ Test error:', error.message)
  }
}

// Run the test
testSuggestEndpoint()
