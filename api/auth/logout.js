import { getSupabaseClient } from '../../lib/supabase.js'
import { logApiEvent } from '../../lib/eventLoggerHelper.js'

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
      // Log failed logout attempt (no user_id provided) - pass null user_id and simple context
      await logApiEvent(
        null,
        'logout_failed',
        null,
        'missing_user_id',
        req.headers['user-agent'] || 'unknown',
        req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown'
      )

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
      // Log failed logout attempt (invalid user_id) - pass null user_id and simple context
      await logApiEvent(
        null,
        'logout_failed',
        null,
        'invalid_user_id',
        user_id,
        userError ? userError.message : 'user_not_found'
      )

      return res.status(401).json({
        status: 'error',
        message: 'Invalid or unknown user_id'
      })
    }

    // Log logout event
    await logApiEvent(
      user.id,
      'logout',
      { username: user.username },
      user.username
    )

    // Return success response
    return res.status(200).json({
      status: 'success',
      logged_out_at: new Date().toISOString()
    })

  } catch (error) {
    console.error('[Logout] Handler error:', error)
    
    // Log error event - pass null user_id and simple context
    await logApiEvent(
      null,
      'logout_failed',
      null,
      'logout_error',
      req.query?.user_id || 'unknown',
      error.message
    )
    
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
} 