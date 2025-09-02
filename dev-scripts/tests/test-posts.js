import fetch from 'node-fetch'
import { TestRunner } from './test-helper.js'

// Test the generate posts endpoint
async function testGenerateEndpoint() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch('http://localhost:3001/api/v1/posts:generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${responseData.message || 'Request failed'}`)
  }

  if (!responseData.post_content) {
    throw new Error('Response missing post_content')
  }

  if (!responseData.word_count) {
    throw new Error('Response missing word_count')
  }

  console.log(`📝 Generated post (${responseData.word_count} words):`)
  console.log('─'.repeat(50))
  console.log(responseData.post_content)
  console.log('─'.repeat(50))
}

// Export function to run tests using TestRunner
export async function runTests() {
  const runner = new TestRunner('Posts')
  
  await runner.test('should generate post content', testGenerateEndpoint)
  
  return await runner.run()
}
