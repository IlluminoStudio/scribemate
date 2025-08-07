import { getSupabaseClient } from '../../lib/supabase.js'
import { logApiEvent } from '../../lib/eventLoggerHelper.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed' 
    })
  }

  const supabase = getSupabaseClient()

  try {
    // Validate user_id parameter is provided
    const { user_id } = req.query
    if (!user_id) {
      await logApiEvent(
        null, // null user_id for failed auth events
        'get_care_events_failed',
        { error: 'Missing user_id parameter' },
        'Missing user_id parameter',
        `Request URL: ${req.url}`,
        `Request method: ${req.method}`
      )
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
      await logApiEvent(
        null, // null user_id for failed auth events
        'get_care_events_failed',
        { error: 'Invalid or unknown user_id', user_id },
        'Invalid or unknown user_id',
        `Provided user_id: ${user_id}`,
        `Request URL: ${req.url}`
      )
      return res.status(401).json({ 
        status: 'error', 
        message: 'Invalid or unknown user_id' 
      })
    }

    // Only coordinators can access care events
    if (currentUser.role !== 'coordinator') {
      await logApiEvent(
        null, // null user_id for failed auth events
        'get_care_events_failed',
        { error: 'User is not a coordinator', user_id, user_role: currentUser.role },
        'User is not a coordinator',
        `User ID: ${user_id}`,
        `User role: ${currentUser.role}`,
        `Request URL: ${req.url}`
      )
      return res.status(403).json({ 
        status: 'error', 
        message: 'Only coordinators may view care events' 
      })
    }

    // Query today's care events for this coordinator
    const { data: careEvents, error: eventsError } = await supabase
      .from('view_today_care_events')
      .select('id, carer_id, event_type, notes, event_time, carer_name, event_time_brisbane')
      .eq('coordinator_id', currentUser.id)

    if (eventsError) {
      await logApiEvent(
        null, // null user_id for failed auth events
        'get_care_events_failed',
        { error: 'Database query failed', user_id, db_error: eventsError.message },
        'Database query failed',
        `User ID: ${user_id}`,
        `Database error: ${eventsError.message}`,
        `Request URL: ${req.url}`
      )
      return res.status(500).json({ 
        status: 'error', 
        message: 'Failed to retrieve care events' 
      })
    }

    // Transform the data to include calculated fields
    const transformedEvents = (careEvents || []).map(event => {
      // Calculate initials from carer_name (e.g., "Jake Miller" -> "JM")
      let initial = ''
      if (event.carer_name) {
        const nameParts = event.carer_name.trim().split(' ')
        initial = nameParts.map(part => part.charAt(0).toUpperCase()).join('')
      }
      
      // Calculate time_of_day from event_time_brisbane (HHMM format)
      let time_of_day = ''
      if (event.event_time_brisbane) {
        const date = new Date(event.event_time_brisbane)
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        time_of_day = hours + minutes
      }
      
      return {
        ...event,
        initial,
        time_of_day
      }
    })

    // Return the transformed care events
    return res.status(200).json(transformedEvents)

  } catch (error) {
    // Log the unexpected error
    await logApiEvent(
      null, // null user_id for failed auth events
      'get_care_events_failed',
      { error: 'Unexpected error', user_id: req.query.user_id, error_message: error.message },
      'Unexpected error occurred',
      `User ID: ${req.query.user_id || 'not provided'}`,
      `Error message: ${error.message}`,
      `Request URL: ${req.url}`
    )
    
    console.error('[DEBUG] Handler error:', error)
    res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error' 
    })
  }
} 