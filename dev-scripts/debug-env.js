import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { getSupabaseClient } from './lib/supabase.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, '..', '.env.local')

console.log('🔍 Debug Environment Variables')
console.log('Current directory:', __dirname)

// Check if we're in development (not on Vercel)
const isDevelopment = process.env.NODE_ENV !== 'production' && !process.env.VERCEL

if (isDevelopment) {
  console.log('Development mode: Looking for .env.local at:', envPath)
  
  // Try to load the environment file
  const result = dotenv.config({ path: envPath })

  if (result.error) {
    console.error('❌ Error loading .env.local:', result.error)
  } else {
    console.log('✅ .env.local loaded successfully')
  }
} else {
  console.log('🚀 Production mode: Using Vercel environment variables')
}

console.log('Environment variables:')
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing')
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing')

async function checkEventLogs() {
  const supabase = getSupabaseClient()
  
  try {
    console.log('🔍 Checking user_event_logs table...')
    
    const { data, error } = await supabase
      .from('user_event_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (error) {
      console.error('❌ Error fetching event logs:', error)
      return
    }
    
    console.log(`📊 Found ${data.length} recent events:`)
    console.log('')
    
    data.forEach((event, index) => {
      console.log(`${index + 1}. ${event.event_type} - User: ${event.user_id} - Time: ${event.created_at}`)
      if (event.metadata1) {
        console.log(`   Metadata: ${JSON.stringify(event.metadata1)}`)
      }
      if (event.general1) {
        console.log(`   General1: ${event.general1}`)
      }
      console.log('')
    })
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

checkEventLogs() 