import fetch from 'node-fetch'
import { TestRunner } from './test-helper.js'
import { EVERGREEN, TRENDING } from '../constants.js'

// Module-level API URL - set by runTests function and accessible to all test functions
let API_URL

// Test the suggest topics endpoint - happy path
async function testSuggestEndpoint() {
  const testData = {
    industry: "private piano teaching"
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

  if (responseData.topics.length !== 4) {
    throw new Error(`Expected exactly 4 topics, got ${responseData.topics.length}`)
  }

  // Validate each topic has valid type and topic properties
  responseData.topics.forEach((topic, index) => {
    if (!topic.type || typeof topic.type !== 'string' || topic.type.length === 0 || 
        (topic.type !== EVERGREEN && topic.type !== TRENDING)) {
      throw new Error(`Topic ${index + 1} has invalid type: ${topic.type}`)
    }
    if (!topic.topic || typeof topic.topic !== 'string' || topic.topic.length === 0) {
      throw new Error(`Topic ${index + 1} has invalid topic: ${topic.topic}`)
    }
  })

  // Count topics by type
  const evergreenCount = responseData.topics.filter(topic => topic.type === EVERGREEN).length
  const trendingCount = responseData.topics.filter(topic => topic.type === TRENDING).length

  if (evergreenCount !== 2) {
    throw new Error(`Expected exactly 2 ${EVERGREEN} topics, got ${evergreenCount}`)
  }

  if (trendingCount !== 2) {
    throw new Error(`Expected exactly 2 ${TRENDING} topics, got ${trendingCount}`)
  }

  console.log('📋 Suggested topics:')
  responseData.topics.forEach((topic, index) => {
    console.log(`   ${index + 1}. [${topic.type}] ${topic.topic}`)
  })
}

// Input Validation Tests
async function testEmptyIndustryString() {
  const testData = {
    industry: ""
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

async function testMissingIndustryField() {
  const testData = {}

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

async function testInvalidIndustryType() {
  const testData = {
    industry: 123
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

async function testNullIndustry() {
  const testData = {
    industry: null
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

async function testVeryLongIndustryString() {
  const testData = {
    industry: "a".repeat(1000) // Very long string
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

// Edge Case Tests - Industry String Length
async function testIndustryTooShort() {
  const testData = {
    industry: "ab" // Less than 3 characters
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

async function testIndustryTooLong() {
  const testData = {
    industry: "a".repeat(81) // More than 80 characters
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

async function testIndustryExactMinLength() {
  const testData = {
    industry: "abc" // Exactly 3 characters
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

async function testIndustryExactMaxLength() {
  const testData = {
    industry: "a".repeat(80) // Exactly 80 characters
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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
async function testIndustryWithEmoji() {
  const testData = {
    industry: "private piano teaching 🎹💰"
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

async function testIndustryWithSpecialCharacters() {
  const testData = {
    industry: "private piano teaching ©®™"
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

async function testIndustryWithUnicodeSymbols() {
  const testData = {
    industry: "private piano teaching αβγδε"
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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

async function testIndustryWithMathematicalSymbols() {
  const testData = {
    industry: "private piano teaching ∑∏∆∇"
  }

  const response = await fetch(`${API_URL}/api/v1/topics:suggest`, {
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



// Export function to run tests using TestRunner
export async function runTests(apiUrl) {
  // Set the global API URL for all test functions
  API_URL = apiUrl
  
  const runner = new TestRunner('Topics')
  
  // Happy path test
  await runner.test('should suggest topics for industry', testSuggestEndpoint)
  
  // Input validation tests
  await runner.test('should reject empty industry string', testEmptyIndustryString)
  await runner.test('should reject missing industry field', testMissingIndustryField)
  await runner.test('should reject invalid industry type (number)', testInvalidIndustryType)
  await runner.test('should reject null industry', testNullIndustry)
  await runner.test('should reject very long industry string', testVeryLongIndustryString)
  
  // Edge case tests - industry string length
  await runner.test('should reject industry string too short (< 3 chars)', testIndustryTooShort)
  await runner.test('should reject industry string too long (> 80 chars)', testIndustryTooLong)
  await runner.test('should accept industry string at minimum length (3 chars)', testIndustryExactMinLength)
  await runner.test('should accept industry string at maximum length (80 chars)', testIndustryExactMaxLength)
  
  // Invalid characters tests
  await runner.test('should reject industry with emoji characters', testIndustryWithEmoji)
  await runner.test('should reject industry with special characters', testIndustryWithSpecialCharacters)
  await runner.test('should reject industry with unicode symbols', testIndustryWithUnicodeSymbols)
  await runner.test('should reject industry with mathematical symbols', testIndustryWithMathematicalSymbols)
  
  return await runner.run()
}