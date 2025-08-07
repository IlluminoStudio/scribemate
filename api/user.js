import { getSupabaseClient } from '../lib/supabase.js'

// DEBUG: Log environment variable presence and partial values
console.log('[DEBUG] SUPABASE_URL defined:', !!process.env.SUPABASE_URL)
console.log('[DEBUG] SUPABASE_SERVICE_ROLE_KEY defined:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
if (process.env.SUPABASE_URL) {
  console.log('[DEBUG] SUPABASE_URL starts with:', process.env.SUPABASE_URL.slice(0, 10))
  console.log('[DEBUG] SUPABASE_URL full:', process.env.SUPABASE_URL)
}
if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log('[DEBUG] SUPABASE_SERVICE_ROLE_KEY starts with:', process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0, 6))
  console.log('[DEBUG] SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY.length)
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const supabase = getSupabaseClient()

  try {
    // Validate user_id parameter is provided
    const { user_id } = req.query
    if (!user_id) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'user_id parameter is required' 
      })
    }

    // Validate user exists and get their role
    const { data: currentUser, error: userError } = await supabase
      .from('view_current_user_profile')
      .select('id, username, full_name, role')
      .eq('id', user_id)
      .single()

    if (userError || !currentUser) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Invalid or unknown user_id' 
      })
    }

    // Only system users (admin) and coordinators can access user data
    if (currentUser.role === 'carer') {
      return res.status(403).json({ 
        status: 'error', 
        message: 'Carers cannot view user data' 
      })
    }

    let data, error

    if (currentUser.role === 'system') {
      // System users (admin) can view all users
      const result = await supabase
        .from('view_current_user_profile')
        .select('id, username, full_name, role, created_at')
      data = result.data
      error = result.error
    } else if (currentUser.role === 'coordinator') {
      // Coordinators can only view their associated carers
      const result = await supabase
        .from('view_current_user_profile')
        .select('id, username, full_name, role, created_at')
        .eq('coordinator_id', currentUser.id)
      data = result.data
      error = result.error
    }

    if (error) {
      console.error('[DEBUG] Supabase error (GET users):', error)
      console.error('[DEBUG] Supabase error (GET users) full object:', JSON.stringify(error, null, 2))
      return res.status(500).json({ error: error.message, details: error })
    }
    
    return res.status(200).json(data)

  } catch (error) {
    console.error('[DEBUG] Handler error:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
} 