import fetch from 'node-fetch'

// Test the generate posts endpoint
async function testGenerateEndpoint() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  try {
    console.log('🧪 Testing /api/v1/posts:generate endpoint...')
    console.log('📤 Sending request:', JSON.stringify(testData, null, 2))

    const response = await fetch('http://localhost:3001/api/v1/posts:generate', {
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
      console.log(`📝 Generated post (${responseData.word_count} words):`)
      console.log('─'.repeat(50))
      console.log(responseData.post_content)
      console.log('─'.repeat(50))
    } else {
      console.log('❌ Test failed! Check the error above.')
    }

  } catch (error) {
    console.error('❌ Test error:', error.message)
  }
}

// Run the test
testGenerateEndpoint()
