import { getSupabaseClient } from '../lib/supabase.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    // Test environment variables
    const hasSupabaseUrl = !!process.env.SUPABASE_URL
    const hasSupabaseKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY
    
    // Test database connection
    let dbConnection = 'Failed'
    let dbError = null
    
    if (hasSupabaseUrl && hasSupabaseKey) {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from('users')
          .select('count')
          .limit(1)
        
        if (error) {
          dbError = error.message
        } else {
          dbConnection = 'Success'
        }
      } catch (error) {
        dbError = error.message
      }
    }

    res.status(200).json({
      message: 'Database Connection Test',
      timestamp: new Date().toISOString(),
      environment: {
        hasSupabaseUrl,
        hasSupabaseKey,
        nodeEnv: process.env.NODE_ENV,
        isVercel: !!process.env.VERCEL
      },
      database: {
        connection: dbConnection,
        error: dbError
      }
    })
  } catch (error) {
    console.error('Database Test API Error:', error)
    res.status(500).json({
      message: 'Database Test API Error',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
} 