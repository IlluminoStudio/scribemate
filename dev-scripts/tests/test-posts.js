import fetch from 'node-fetch'
import { TestRunner } from './test-helper.js'

// Module-level API URL - set by runTests function and accessible to all test functions
let API_URL

// Test the generate posts endpoint - happy path
async function testGenerateEndpoint() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
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

// Input Validation Tests - Missing Required Fields
async function testMissingTopic() {
  const testData = {
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

async function testMissingSocialMedia() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

async function testMissingMaxWordCount() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "facebook",
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}



// Topic String Length Tests
async function testTopicTooShort() {
  const testData = {
    topic: "abc", // Less than 5 characters
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

async function testTopicTooLong() {
  const testData = {
    topic: "a".repeat(161), // More than 160 characters
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

async function testTopicExactMinLength() {
  const testData = {
    topic: "abcde", // Exactly 5 characters
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
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

  if (responseData.status !== 'success') {
    throw new Error('Expected success status in response')
  }
}

async function testTopicExactMaxLength() {
  const testData = {
    topic: "a".repeat(160), // Exactly 160 characters
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
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

  if (responseData.status !== 'success') {
    throw new Error('Expected success status in response')
  }
}

// Invalid Topic Type Tests
async function testTopicAsNumber() {
  const testData = {
    topic: 123,
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

async function testTopicAsNull() {
  const testData = {
    topic: null,
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

// Invalid Social Media Platform Tests
async function testInvalidSocialMediaPlatform() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "twitter", // Invalid platform
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

// Max Word Count Tests
async function testMaxWordCountTooHigh() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "facebook",
    max_word_count: 2001, // More than 2000
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

async function testMaxWordCountExactLimit() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "facebook",
    max_word_count: 2000, // Exactly 2000
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
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

  if (responseData.status !== 'success') {
    throw new Error('Expected success status in response')
  }
}

// Invalid Characters Tests
async function testTopicWithEmoji() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable 🎹💰",
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

async function testTopicWithSpecialCharacters() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable ©®™",
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

async function testTopicWithUnicodeSymbols() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable αβγδε",
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly, educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

async function testToneGuideWithEmoji() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly 😊 educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

async function testToneGuideWithSpecialCharacters() {
  const testData = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "facebook",
    max_word_count: 150,
    tone_guide: "professional yet friendly ★ educational"
  }

  const response = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

  if (response.status !== 400) {
    throw new Error(`Expected 400 status, got ${response.status}`)
  }

  const responseData = await response.json()
  if (responseData.status !== 'error') {
    throw new Error('Expected error status in response')
  }
}

// Fallback Tone Guide Tests
async function testFallbackToneGuide() {
  // Test 1: When tone_guide is missing altogether
  const testDataWithoutToneGuide = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "facebook",
    max_word_count: 150
    // tone_guide is intentionally omitted
  }

  const response1 = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testDataWithoutToneGuide)
  })

  const responseData1 = await response1.json()

  if (!response1.ok) {
    throw new Error(`HTTP ${response1.status}: ${responseData1.message || 'Request failed'}`)
  }

  if (responseData1.status !== 'success') {
    throw new Error('Expected success status in response when tone_guide is missing')
  }

  if (!responseData1.post_content) {
    throw new Error('Response missing post_content when tone_guide is missing')
  }

  console.log(`🔄 Test 1 - Missing tone_guide: Generated post (${responseData1.word_count} words)`)
  console.log('─'.repeat(50))
  console.log(responseData1.post_content)
  console.log('─'.repeat(50))

  // Test 2: When tone_guide is provided but is empty string
  const testDataWithEmptyToneGuide = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "linkedin",
    max_word_count: 150,
    tone_guide: "" // Empty string
  }

  const response2 = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testDataWithEmptyToneGuide)
  })

  const responseData2 = await response2.json()

  if (!response2.ok) {
    throw new Error(`HTTP ${response2.status}: ${responseData2.message || 'Request failed'}`)
  }

  if (responseData2.status !== 'success') {
    throw new Error('Expected success status in response when tone_guide is empty')
  }

  if (!responseData2.post_content) {
    throw new Error('Response missing post_content when tone_guide is empty')
  }

  console.log(`🔄 Test 2 - Empty tone_guide: Generated post (${responseData2.word_count} words)`)
  console.log('─'.repeat(50))
  console.log(responseData2.post_content)
  console.log('─'.repeat(50))

  // Test 3: When tone_guide is provided but contains only whitespace
  const testDataWithWhitespaceToneGuide = {
    topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
    social_media: "blog",
    max_word_count: 150,
    tone_guide: "   \t\n   " // Whitespace only
  }

  const response3 = await fetch(`${API_URL}/api/v1/posts:generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testDataWithWhitespaceToneGuide)
  })

  const responseData3 = await response3.json()

  if (!response3.ok) {
    throw new Error(`HTTP ${response3.status}: ${responseData3.message || 'Request failed'}`)
  }

  if (responseData3.status !== 'success') {
    throw new Error('Expected success status in response when tone_guide is whitespace only')
  }

  if (!responseData3.post_content) {
    throw new Error('Response missing post_content when tone_guide is whitespace only')
  }

  console.log(`🔄 Test 3 - Whitespace tone_guide: Generated post (${responseData3.word_count} words)`)
  console.log('─'.repeat(50))
  console.log(responseData3.post_content)
  console.log('─'.repeat(50))
}

// Export function to run tests using TestRunner
export async function runTests(apiUrl) {
  // Set the global API URL for all test functions
  API_URL = apiUrl
  
  const runner = new TestRunner('Posts')
  
  // Happy path test
  // await runner.test('should generate post content', testGenerateEndpoint)
  
  // // Input validation tests - missing required fields
  // await runner.test('should reject missing topic field', testMissingTopic)
  // await runner.test('should reject missing social_media field', testMissingSocialMedia)
  // await runner.test('should reject missing max_word_count field', testMissingMaxWordCount)

  
  // // Topic string length tests
  // await runner.test('should reject topic string too short (< 5 chars)', testTopicTooShort)
  // await runner.test('should reject topic string too long (> 160 chars)', testTopicTooLong)
  // await runner.test('should accept topic string at minimum length (5 chars)', testTopicExactMinLength)
  // await runner.test('should accept topic string at maximum length (160 chars)', testTopicExactMaxLength)
  
  // // Invalid topic type tests
  // await runner.test('should reject topic as number', testTopicAsNumber)
  // await runner.test('should reject topic as null', testTopicAsNull)
  
  // // Invalid social media platform tests
  // await runner.test('should reject invalid social media platform', testInvalidSocialMediaPlatform)
  
  // // Max word count tests
  // await runner.test('should reject max_word_count too high (> 2000)', testMaxWordCountTooHigh)
  // await runner.test('should accept max_word_count at exact limit (2000)', testMaxWordCountExactLimit)
  
  // // Invalid characters tests
  // await runner.test('should reject topic with emoji characters', testTopicWithEmoji)
  // await runner.test('should reject topic with special characters', testTopicWithSpecialCharacters)
  // await runner.test('should reject topic with unicode symbols', testTopicWithUnicodeSymbols)
  // await runner.test('should reject tone_guide with emoji characters', testToneGuideWithEmoji)
  // await runner.test('should reject tone_guide with special characters', testToneGuideWithSpecialCharacters)
  
  // Fallback tone guide test
  await runner.test('should use fallback tone guide when missing or empty', testFallbackToneGuide)
  
  return await runner.run()
}