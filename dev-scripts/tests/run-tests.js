import { runTests as runLoginTests } from './test-login.js'
import { runTests as runUserTests } from './test-user.js'
import { runTests as runLogoutTests } from './test-logout.js'
import { runTests as runMessageTests } from './test-message.js'
import { runTests as runMyMessageTests } from './test-my-message.js'
import { runTests as runMyCareEventTests } from './test-my-care-event.js'
import { runTests as runMyClockStatusTests } from './test-my-clock-status.js'
import { runTests as runCareEventTests } from './test-care-event.js'
import { TestRunner } from './test-helper.js'

console.log('🚀 Starting API Tests...\n')

// Check if server is running
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'

console.log(`📡 Testing against: ${BASE_URL}`)
console.log('⚠️  Make sure the API server is running with: npm run dev\n')

async function runAllTests() {
  const testResults = []
  let allTestsPassed = true
  const allFailedTests = []
  
  try {
    // Run login tests
    console.log('🔐 Running Login Tests...')
    const loginResult = await runLoginTests()
    testResults.push({ suite: 'Login', result: loginResult })
    if (loginResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Run user tests
    console.log('👤 Running User Tests...')
    const userResult = await runUserTests()
    testResults.push({ suite: 'User', result: userResult })
    if (userResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Run logout tests
    console.log('🚪 Running Logout Tests...')
    const logoutResult = await runLogoutTests()
    testResults.push({ suite: 'Logout', result: logoutResult })
    if (logoutResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Run message tests
    console.log('💬 Running Message Tests...')
    const messageResult = await runMessageTests()
    testResults.push({ suite: 'Message', result: messageResult })
    if (messageResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Run my-message tests (now includes acknowledgment tests)
    console.log('📨 Running My Message Tests...')
    const myMessageResult = await runMyMessageTests()
    testResults.push({ suite: 'My Message', result: myMessageResult })
    if (myMessageResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Run my-care-event tests
    console.log('🏥 Running My Care Event Tests...')
    const myCareEventResult = await runMyCareEventTests()
    testResults.push({ suite: 'My Care Event', result: myCareEventResult })
    if (myCareEventResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Run my-clock-status tests
    console.log('⏰ Running My Clock Status Tests...')
    const myClockStatusResult = await runMyClockStatusTests()
    testResults.push({ suite: 'My Clock Status', result: myClockStatusResult })
    if (myClockStatusResult === false) {
      allTestsPassed = false
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Run care-event tests
    console.log('📋 Running Care Event Tests...')
    const careEventResult = await runCareEventTests()
    testResults.push({ suite: 'Care Event', result: careEventResult })
    if (careEventResult === false) {
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