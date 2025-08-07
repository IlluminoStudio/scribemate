import { getSupabaseClient } from '../lib/supabase.js'
import { logApiEvent } from '../lib/eventLoggerHelper.js'

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
      // Log failed attempt with null user_id (will use system admin)
      await logApiEvent(
        null, 
        'get_clock_status_failed', 
        { 
          attempted_user_id: user_id,
          reason: 'invalid_user_id',
          error: userError?.message || 'User not found'
        },
        `Failed to get clock status: Invalid user_id ${user_id}`
      )
      
      return res.status(401).json({ 
        status: 'error', 
        message: 'Invalid or unknown user_id' 
      })
    }

    // Only carers can access their clock status
    if (currentUser.role !== 'carer') {
      // Log failed attempt with null user_id (will use system admin)
      await logApiEvent(
        null, 
        'get_clock_status_failed', 
        { 
          attempted_user_id: user_id,
          user_role: currentUser.role,
          reason: 'not_carer'
        },
        `Failed to get clock status: User ${currentUser.username} (${currentUser.role}) is not a carer`
      )
      
      return res.status(403).json({ 
        status: 'error', 
        message: 'Only carers can access their clock status' 
      })
    }

    // Get clock status from view_my_clock_status
    const { data: clockStatus, error } = await supabase
      .from('view_my_clock_status')
      .select('carer_id, full_name, event_type, event_time')
      .eq('carer_id', currentUser.id)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      // Log failed attempt with null user_id (will use system admin)
      await logApiEvent(
        null, 
        'get_clock_status_failed', 
        { 
          attempted_user_id: user_id,
          carer_id: currentUser.id,
          reason: 'database_error',
          error: error.message
        },
        `Failed to get clock status: Database error for carer ${currentUser.id}`
      )
      
      return res.status(500).json({ 
        status: 'error', 
        message: 'Failed to retrieve clock status' 
      })
    }

    // If no record found, return default clock_out status
    if (!clockStatus) {
      const defaultStatus = {
        carer_id: currentUser.id,
        full_name: currentUser.full_name,
        event_type: 'clock_out',
        event_time: null
      }
      
      return res.status(200).json(defaultStatus)
    }

    // Return the clock status
    return res.status(200).json(clockStatus)

  } catch (error) {
    console.error('[DEBUG] Handler error:', error)
    
    // Log failed attempt with null user_id (will use system admin)
    await logApiEvent(
      null, 
      'get_clock_status_failed', 
      { 
        attempted_user_id: req.query.user_id,
        reason: 'handler_error',
        error: error.message
      },
      `Failed to get clock status: Handler error`
    )
    
    res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error' 
    })
  }
} 