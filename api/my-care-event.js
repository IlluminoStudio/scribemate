import { getSupabaseClient } from '../lib/supabase.js'
import { logApiEvent } from '../lib/eventLoggerHelper.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST method
  if (req.method !== 'POST') {
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
      // Log the failure before returning the response
      await logApiEvent(
        null, // Use admin user ID for failed auth events
        'create_care_event_failed',
        { reason: 'missing_or_invalid_user_id' },
        'Care event creation failed due to missing or invalid user_id'
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
      // Log the failure before returning the response
      await logApiEvent(
        null, // Use admin user ID for failed auth events
        'create_care_event_failed',
        { reason: 'missing_or_invalid_user_id', provided_user_id: user_id },
        'Care event creation failed due to missing or invalid user_id'
      )
      
      return res.status(401).json({ 
        status: 'error', 
        message: 'Invalid or unknown user_id' 
      })
    }

    // Only carers can create care events
    if (currentUser.role !== 'carer') {
      // Log the failure before returning the response
      await logApiEvent(
        currentUser.id,
        'create_care_event_failed',
        { reason: 'user_not_carer', user_role: currentUser.role },
        'User attempted to create care event but is not a carer'
      )
      
      return res.status(403).json({ 
        status: 'error', 
        message: 'User is not a carer' 
      })
    }

    // Validate request body
    const { carer_id, event_type, notes } = req.body

    // Validate required fields
    if (!carer_id || !event_type) {
      // Log the failure before returning the response
      await logApiEvent(
        currentUser.id,
        'create_care_event_failed',
        { reason: 'missing_required_fields', carer_id: !!carer_id, event_type: !!event_type },
        'Care event creation failed due to missing required fields'
      )
      
      return res.status(400).json({
        status: 'error',
        message: 'carer_id and event_type are required'
      })
    }

    // Validate that the carer_id matches the authenticated user
    if (carer_id !== currentUser.id) {
      // Log the failure before returning the response
      await logApiEvent(
        currentUser.id,
        'create_care_event_failed',
        { reason: 'carer_id_mismatch', provided_carer_id: carer_id, authenticated_user_id: currentUser.id },
        'Care event creation failed due to carer_id mismatch'
      )
      
      return res.status(400).json({
        status: 'error',
        message: 'carer_id must match the authenticated user'
      })
    }

    // Validate event_type is valid
    const validEventTypes = ['clock_in', 'clock_out', 'exercise', 'medication', 'bowel_movement']
    if (!validEventTypes.includes(event_type)) {
      // Log the failure before returning the response
      await logApiEvent(
        currentUser.id,
        'create_care_event_failed',
        { reason: 'invalid_event_type', provided_event_type: event_type, valid_types: validEventTypes },
        'Care event creation failed due to invalid event type'
      )
      
      return res.status(400).json({
        status: 'error',
        message: `Invalid event_type. Must be one of: ${validEventTypes.join(', ')}`
      })
    }

    // Create the care event
    const careEventData = {
      carer_id: currentUser.id,
      event_type,
      notes: notes || null
    }

    const { data: careEvent, error: careEventError } = await supabase
      .from('care_events')
      .insert(careEventData)
      .select('id, carer_id, event_type, notes, event_time')
      .single()

    if (careEventError) {
      console.error('[DEBUG] Supabase error (POST my-care-event):', careEventError)
      
      // Log the failure before returning the response
      await logApiEvent(
        currentUser.id,
        'create_care_event_failed',
        { reason: 'database_error', error: careEventError.message },
        'Care event creation failed due to database error'
      )
      
      return res.status(500).json({ error: careEventError.message, details: careEventError })
    }

    // Log successful care event creation before returning the response
    await logApiEvent(
      currentUser.id,
      'create_care_event',
      { 
        care_event_id: careEvent.id,
        event_type: careEvent.event_type,
        has_notes: !!careEvent.notes
      },
      `Care event created: ${careEvent.event_type}`
    )

    // Return the created care event
    return res.status(201).json(careEvent)

  } catch (error) {
    console.error('[DEBUG] Unexpected error in my-care-event:', error)
    
    // Try to log the error, but don't let logging failure prevent the response
    try {
      const { user_id } = req.query
      if (user_id) {
        await logApiEvent(
          user_id,
          'create_care_event_failed',
          { reason: 'unexpected_error', error: error.message },
          'Care event creation failed due to unexpected error'
        )
      }
    } catch (logError) {
      console.error('[DEBUG] Failed to log error event:', logError)
    }
    
    return res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error' 
    })
  }
} 