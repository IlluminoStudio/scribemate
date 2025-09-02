import fetch from 'node-fetch'
import { TestRunner } from './test-helper.js'

// Test the suggest topics endpoint
async function testSuggestEndpoint() {
  const testData = {
    industry: "private piano teaching"
  }

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  if (!responseData.topics || !Array.isArray(responseData.topics)) {
    throw new Error('Response missing topics array')
  }

  if (responseData.topics.length === 0) {
    throw new Error('Response topics array is empty')
  }

  console.log('📋 Suggested topics:')
  responseData.topics.forEach((topic, index) => {
    console.log(`   ${index + 1}. ${topic}`)
  })
}

// Export function to run tests using TestRunner
export async function runTests() {
  const runner = new TestRunner('Topics')
  
  await runner.test('should suggest topics for industry', testSuggestEndpoint)
  
  return await runner.run()
}
