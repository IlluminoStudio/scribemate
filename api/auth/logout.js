import { getSupabaseClient } from '../../lib/supabase.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const supabase = getSupabaseClient()

  try {
    const { user_id } = req.query

    // Validate required user_id parameter
    if (!user_id) {
      return res.status(401).json({
        status: 'error',
        message: 'user_id parameter is required'
      })
    }

    // Verify user exists and is not deleted
    const { data: user, error: userError } = await supabase
      .from('view_current_user_profile')
      .select('id, username, full_name, role')
      .eq('id', user_id)
      .single()

    if (userError || !user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or unknown user_id'
      })
    }

    // Logout successful

    // Return success response
    return res.status(200).json({
      status: 'success',
      logged_out_at: new Date().toISOString()
    })

  } catch (error) {
    console.error('[Logout] Handler error:', error)
    
    // Error occurred during logout
    
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
} 