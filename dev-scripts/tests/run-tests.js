import { runTests as runPostsTests } from './test-posts.js'
import { runTests as runTopicsTests } from './test-topics.js'

console.log('🚀 Starting API Tests...\n')

// Check if server is running
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'

console.log(`📡 Testing against: ${BASE_URL}`)
console.log('⚠️  Make sure the API server is running with: npm run dev\n')

async function runAllTests() {
  const testResults = []
  let allTestsPassed = true
  
  try {
    // Run posts tests
    console.log('📝 Running Posts Tests...')
    const postsResult = await runPostsTests()
    testResults.push({ suite: 'Posts', result: postsResult })
    if (postsResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Run topics tests
    console.log('📋 Running Topics Tests...')
    const topicsResult = await runTopicsTests()
    testResults.push({ suite: 'Topics', result: topicsResult })
    if (topicsResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n🎉 All test suites completed!')
    
    // Report detailed results
    const failedSuites = testResults.filter(r => r.result === false)
    const passedSuites = testResults.filter(r => r.result === true)
    
    console.log('\n📈 Test Suite Summary:')
    console.log(`   ✅ Passed: ${passedSuites.length} test suites`)
    console.log(`   ❌ Failed: ${failedSuites.length} test suites`)
    console.log(`   📊 Total: ${testResults.length} test suites`)
    
    if (allTestsPassed) {
      console.log('\n✅ All test suites passed!')
      process.exit(0)
    } else {
      console.log('\n❌ Some test suites failed!')
      console.log('\n📊 Failed Test Suites:')
      failedSuites.forEach(suite => {
        console.log(`   ❌ ${suite.suite} Tests`)
      })
      
      console.log('\n💡 To see detailed failure information, run individual test files:')
      failedSuites.forEach(suite => {
        const fileName = suite.suite.toLowerCase().replace(/\s+/g, '-')
        console.log(`   npm test -- --grep "${fileName}"`)
      })
      
      console.log('\n🔍 For even more detailed debugging, you can also run:')
      console.log('   npm test -- --grep "specific-test-name"')
      console.log('   (replace "specific-test-name" with the actual test name from the output above)')
      
      console.log('\n📝 Note: Individual test failures are shown in the output above each test suite.')
      console.log('   Look for lines starting with "❌" to see which specific tests failed.')
      
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Test runner failed:', error)
    process.exit(1)
  }
}

runAllTests() 