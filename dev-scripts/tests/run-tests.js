import { runTests as runPostsTests } from './test-posts.js'
import { runTests as runTopicsTests } from './test-topics.js'
import { LOCAL_DOMAIN } from '../constants.js'

console.log('🚀 Starting API Tests...\n')

const BASE_URL = LOCAL_DOMAIN

console.log(`📡 Testing against: ${BASE_URL}`)
console.log('⚠️  Make sure the API server is running with: npm run dev\n')

async function runAllTests() {
  const testResults = []
  let allTestsPassed = true
  
  try {
    // Run posts tests
    console.log('📝 Running Posts Tests...')
    const postsResult = await runPostsTests(BASE_URL)
    testResults.push({ suite: 'Posts', result: postsResult })
    if (postsResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Run topics tests
    console.log('📋 Running Topics Tests...')
    const topicsResult = await runTopicsTests(BASE_URL)
    testResults.push({ suite: 'Topics', result: topicsResult })
    if (topicsResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n🎉 All test suites completed!')
    
    // Report detailed results
    const failedSuites = testResults.filter(r => r.result === false)
    const passedSuites = testResults.filter(r => r.result === true)
    
    console.log('\n📊 Test Results Summary:')
    console.log('─'.repeat(30))
    
    if (passedSuites.length > 0) {
      console.log('✅ Passed:')
      passedSuites.forEach(suite => {
        console.log(`   • ${suite.suite}`)
      })
    }
    
    if (failedSuites.length > 0) {
      console.log('❌ Failed:')
      failedSuites.forEach(suite => {
        console.log(`   • ${suite.suite}`)
      })
    }
    
    console.log('─'.repeat(30))
    console.log(`Total: ${testResults.length} suites`)
    console.log(`Passed: ${passedSuites.length}`)
    console.log(`Failed: ${failedSuites.length}`)
    
    if (allTestsPassed) {
      console.log('\n🎉 All tests passed!')
      process.exit(0)
    } else {
      console.log('\n💥 Some tests failed!')
      process.exit(1)
    }
    
  } catch (error) {
    console.error('\n💥 Test runner error:', error.message)
    process.exit(1)
  }
}

// Run the tests
runAllTests()