import fetch from 'node-fetch'
import { TestRunner } from './test-helper.js'

// Test the suggest topics endpoint - happy path
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

// Input Validation Tests
async function testEmptyIndustryString() {
  const testData = {
    industry: ""
  }

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  if (responseData.status !== 'success') {
    throw new Error('Expected success status in response')
  }
}

async function testIndustryExactMaxLength() {
  const testData = {
    industry: "a".repeat(80) // Exactly 80 characters
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

  if (responseData.status !== 'success') {
    throw new Error('Expected success status in response')
  }
}

// Invalid Characters Tests
async function testIndustryWithEmoji() {
  const testData = {
    industry: "private piano teaching 🎹💰"
  }

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

  const response = await fetch('http://localhost:3001/api/v1/topics:suggest', {
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

// Fallback Response Test
async function testFallbackResponse() {
  // This test assumes there's a fallback mechanism when no topics are returned
  // We'll test with an industry that might trigger the fallback
  const testData = {
    industry: "xyz unknown industry that might not generate topics"
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

  if (responseData.status !== 'success') {
    throw new Error('Expected success status in response')
  }

  // Check if fallback topics are returned
  if (!responseData.topics || !Array.isArray(responseData.topics)) {
    throw new Error('Response missing topics array')
  }

  if (responseData.topics.length === 0) {
    throw new Error('Fallback should provide some topics, but array is empty')
  }

  console.log('🔄 Fallback topics returned:')
  responseData.topics.forEach((topic, index) => {
    console.log(`   ${index + 1}. ${topic}`)
  })
}

// Export function to run tests using TestRunner
export async function runTests() {
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
  
  // Fallback response test
  await runner.test('should return fallback topics when no topics generated', testFallbackResponse)
  
  return await runner.run()
}
