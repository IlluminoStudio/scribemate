import { getSupabaseClient } from '../lib/supabase.js'
import { logApiEvent } from '../lib/eventLoggerHelper.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
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

    // Only carers can access their messages through this endpoint
    if (req.method === 'GET' && currentUser.role !== 'carer') {
      return res.status(403).json({ 
        status: 'error', 
        message: 'Only carers can access their messages through this endpoint' 
      })
    }
    // Only carers can acknowledge messages
    if (req.method === 'POST' && currentUser.role !== 'carer') {
      return res.status(403).json({ 
        status: 'error', 
        message: 'Only carers can acknowledge messages' 
      })
    }

    // Handle GET request - retrieve messages
    if (req.method === 'GET') {
      // Get messages for the carer using the function
      const { data: messages, error } = await supabase
        .rpc('get_my_messages', { carer_id_param: currentUser.id })

      if (error) {
        console.error('[DEBUG] Supabase error (GET my-message):', error)
        return res.status(500).json({ error: error.message, details: error })
      }
      
      return res.status(200).json(messages || [])
    }

    // Handle POST request - acknowledge message
    if (req.method === 'POST') {
      const { message_id } = req.body

      if (!message_id) {
        await logApiEvent(
          currentUser.id,
          'ack_message_failed',
          { error: 'Missing message_id in request body' },
          'Missing message_id parameter'
        )
        return res.status(400).json({ 
          status: 'error', 
          message: 'message_id is required in request body' 
        })
      }

      // Verify message belongs to carer and is not already acknowledged
      const { data: messages, error: messagesError } = await supabase
        .rpc('get_my_messages', { carer_id_param: currentUser.id })

      if (messagesError) {
        await logApiEvent(
          currentUser.id,
          'ack_message_failed',
          { error: messagesError.message, message_id },
          'Failed to retrieve messages for validation'
        )
        return res.status(500).json({ 
          status: 'error', 
          message: 'Failed to validate message' 
        })
      }

      // Find the specific message
      const targetMessage = messages.find(msg => msg.message_id === message_id)
      
      if (!targetMessage) {
        await logApiEvent(
          currentUser.id,
          'ack_message_failed',
          { message_id, error: 'Message not found or not assigned to carer' },
          'Message not found or not assigned to carer'
        )
        return res.status(404).json({ 
          status: 'error', 
          message: 'Message not found or not assigned to carer' 
        })
      }

      if (targetMessage.status === 'acknowledged') {
        await logApiEvent(
          currentUser.id,
          'ack_message_failed',
          { message_id, error: 'Message already acknowledged' },
          'Message already acknowledged'
        )
        return res.status(409).json({ 
          status: 'error', 
          message: 'Message already acknowledged' 
        })
      }

      // Create acknowledgment record
      const { data: ackData, error: ackError } = await supabase
        .from('message_acknowledgements')
        .insert({
          message_id: message_id,
          carer_id: currentUser.id,
          acknowledged_at: new Date().toISOString()
        })
        .select('acknowledged_at')
        .single()

      if (ackError) {
        await logApiEvent(
          currentUser.id,
          'ack_message_failed',
          { message_id, error: ackError.message },
          'Failed to create acknowledgment record'
        )
        return res.status(500).json({ 
          status: 'error', 
          message: 'Failed to acknowledge message' 
        })
      }

      // Create care event for the acknowledgment
      const { error: careEventError } = await supabase
        .from('care_events')
        .insert({
          carer_id: currentUser.id,
          event_type: 'medication', // Using medication as a generic event type for message acknowledgment
          notes: `Message acknowledged: ${targetMessage.title || 'No title'}`,
          event_time: new Date().toISOString()
        })

      if (careEventError) {
        // Log the care event creation failure but don't fail the entire operation
        console.error('[DEBUG] Failed to create care event for message acknowledgment:', careEventError)
      }

      // Log successful acknowledgment
      await logApiEvent(
        currentUser.id,
        'ack_message',
        { 
          message_id,
          message_title: targetMessage.title,
          is_broadcast: targetMessage.is_broadcast
        },
        `Message acknowledged: ${targetMessage.title || 'No title'}`
      )

      return res.status(200).json({
        status: 'acknowledged',
        message_id: message_id,
        carer_id: currentUser.id,
        acknowledged_at: ackData.acknowledged_at
      })
    }

    // Method not allowed
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed' 
    })

  } catch (error) {
    console.error('[DEBUG] Handler error:', error)
    
    // Try to log the error if we have user context
    try {
      const { user_id } = req.query
      if (user_id) {
        await logApiEvent(
          user_id,
          'ack_message_failed',
          { error: error.message },
          'Unexpected error in message handler'
        )
      }
    } catch (logError) {
      console.error('[DEBUG] Failed to log error:', logError)
    }
    
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
} 