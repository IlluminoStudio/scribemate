/**
 * Test Helper - Provides standardized test running with detailed failure reporting
 */

export class TestRunner {
  constructor(suiteName) {
    this.suiteName = suiteName
    this.tests = []
    this.passedTests = 0
    this.totalTests = 0
    this.failedTests = []
  }

  async test(name, testFn) {
    this.totalTests++
    console.log(`\n🧪 Running test: ${name}`)
    
    try {
      await testFn()
      console.log(`✅ ${name}`)
      this.passedTests++
    } catch (error) {
      console.log(`❌ ${name}`)
      console.log(`   Error: ${error.message}`)
      this.failedTests.push({
        name,
        error: error.message,
        suite: this.suiteName
      })
    }
  }

  getResults() {
    console.log(`\n📊 Test Results: ${this.passedTests}/${this.totalTests} tests passed`)
    
    if (this.passedTests === this.totalTests) {
      console.log('🎉 All tests passed!')
      return {
        success: true,
        passed: this.passedTests,
        total: this.totalTests,
        failedTests: []
      }
    } else {
      console.log('💥 Some tests failed!')
      console.log('\n📋 Failed Tests:')
      this.failedTests.forEach(test => {
        console.log(`   ❌ ${test.name}: ${test.error}`)
      })
      
      return {
        success: false,
        passed: this.passedTests,
        total: this.totalTests,
        failedTests: this.failedTests
      }
    }
  }

  async run() {
    const results = this.getResults()
    return results.success
  }
}

// Helper function to create a test runner
export function createTestRunner(suiteName) {
  return new TestRunner(suiteName)
} 