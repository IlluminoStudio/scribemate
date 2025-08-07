import { getSupabaseClient } from '../lib/supabase.js'
import { logMessageCreateFailed, logMessageCreateSuccess, logMessageGetFailed } from '../lib/eventLoggerHelper.js'
import { 
  isCarerAssociatedWithCoordinator, 
  getCarersForCoordinator 
} from '../lib/userUtils.js'

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
      // Log the failure before returning the response
      await logMessageCreateFailed(
        null, // Use admin user ID for failed auth events
        { reason: 'missing_or_invalid_user_id' },
        'Message creation failed due to missing or invalid user_id'
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
      await logMessageCreateFailed(
        null, // Use admin user ID for failed auth events
        { reason: 'missing_or_invalid_user_id', provided_user_id: user_id },
        'Message creation failed due to missing or invalid user_id'
      )
      
      return res.status(401).json({ 
        status: 'error', 
        message: 'Invalid or unknown user_id' 
      })
    }

    // Only coordinators can access messages
    if (currentUser.role !== 'coordinator') {
      // Log the failure before returning the response
      await logMessageCreateFailed(
        currentUser.id,
        { reason: 'user_not_coordinator', user_role: currentUser.role },
        'User attempted to create message but is not a coordinator'
      )
      
      return res.status(403).json({ 
        status: 'error', 
        message: 'User is not a coordinator' 
      })
    }

    // Handle GET request - return coordinator's messages
    if (req.method === 'GET') {
      const { status } = req.query
      
      let query = supabase
        .from('view_message_status_per_carer')
        .select('message_id, sender_id, title, body, is_broadcast, created_at, carer_id, carer_name, is_acknowledged')
        .eq('sender_id', currentUser.id)
        .order('created_at', { ascending: false })

      // Filter by status if provided
      if (status === 'unread') {
        query = query.eq('is_acknowledged', false)
      }

      const { data, error } = await query

      if (error) {
        console.error('[DEBUG] Supabase error (GET messages):', error)
        
        // Log the failure before returning the response
        await logMessageGetFailed(
          currentUser.id,
          { 
            reason: 'database_error', 
            error: error.message,
            status_filter: status || 'all',
            query_type: 'get_messages'
          },
          'Message retrieval failed due to database error',
          status ? `Filtered by status: ${status}` : 'All messages requested'
        )
        
        return res.status(500).json({ error: error.message, details: error })
      }

      // Transform the response to match MessageSummary schema
      const transformedData = data.map(item => ({
        id: item.message_id,
        sender_id: item.sender_id,
        title: item.title,
        body: item.body,
        is_broadcast: item.is_broadcast,
        created_at: item.created_at,
        carer_id: item.carer_id,
        carer_name: item.carer_name,
        is_acknowledged: item.is_acknowledged
      }))

      return res.status(200).json(transformedData)
    }

    // Handle POST request - create new message
    if (req.method === 'POST') {
      const { title, body, is_broadcast, carer_id } = req.body

      // Validate required fields
      if (!title || !body || typeof is_broadcast !== 'boolean') {
        // Log the failure before returning the response
        await logMessageCreateFailed(
          currentUser.id,
          { reason: 'missing_required_fields', title: !!title, body: !!body, is_broadcast: typeof is_broadcast },
          'Message creation failed due to missing required fields'
        )
        
        return res.status(400).json({
          status: 'error',
          message: 'title, body, and is_broadcast are required'
        })
      }

      // Validate carer_id array is provided for private messages
      if (!is_broadcast && (!carer_id || !Array.isArray(carer_id) || carer_id.length === 0)) {
        // Log the failure before returning the response
        await logMessageCreateFailed(
          currentUser.id,
          { reason: 'missing_carer_ids_for_private', carer_id_provided: !!carer_id, is_array: Array.isArray(carer_id) },
          'Private message creation failed due to missing carer_id array'
        )
        
        return res.status(400).json({
          status: 'error',
          message: 'carer_id array is required for private messages'
        })
      }

      // For private messages, validate that all carers are associated with this coordinator
      if (!is_broadcast) {
        for (const carerId of carer_id) {
          const isAssociated = await isCarerAssociatedWithCoordinator(carerId, currentUser.id)
          if (!isAssociated) {
            // Log the failure before returning the response
            await logMessageCreateFailed(
              currentUser.id,
              { reason: 'carer_not_associated', carer_id: carerId },
              `Carer ${carerId} is not associated with coordinator ${currentUser.id}`
            )
            
            return res.status(400).json({
              status: 'error',
              message: `Carer ${carerId} is not associated with this coordinator`
            })
          }
        }
      }

      // Create the message
      const { data: message, error: messageError } = await supabase
        .from('messages')
        .insert({
          sender_id: currentUser.id,
          title,
          body,
          is_broadcast
        })
        .select('id, sender_id, title, body, is_broadcast, created_at')
        .single()

      if (messageError) {
        console.error('[DEBUG] Supabase error (POST messages):', messageError)
        
        // Log the failure before returning the response
        await logMessageCreateFailed(
          currentUser.id,
          { reason: 'database_error', error: messageError.message },
          'Message creation failed due to database error'
        )
        
        return res.status(500).json({ error: messageError.message, details: messageError })
      }

      // Determine recipients based on message type
      let recipientCarerIds = []
      
      if (is_broadcast) {
        // For broadcast messages, get all carers associated with this coordinator
        recipientCarerIds = await getCarersForCoordinator(currentUser.id)
      } else {
        // For private messages, use the provided carer_id array
        recipientCarerIds = carer_id
      }

      // Create message recipient entries
      if (recipientCarerIds.length > 0) {
        const recipientEntries = recipientCarerIds.map(carerId => ({
          message_id: message.id,
          carer_id: carerId
        }))

        const { error: recipientError } = await supabase
          .from('message_recipients')
          .insert(recipientEntries)

        if (recipientError) {
          console.error('[DEBUG] Supabase error (message recipients):', recipientError)
          
          // Log the failure before returning the response
          await logMessageCreateFailed(
            currentUser.id,
            { reason: 'recipient_creation_failed', message_id: message.id, error: recipientError.message },
            'Message created but recipient assignment failed'
          )
          
          return res.status(500).json({ error: recipientError.message, details: recipientError })
        }
      }

      // Log successful message creation before returning the response
      await logMessageCreateSuccess(
        currentUser.id,
        { 
          message_id: message.id, 
          is_broadcast, 
          recipient_count: recipientCarerIds.length,
          recipient_ids: recipientCarerIds
        },
        `Message "${title}" created successfully`,
        is_broadcast ? 'Broadcast message' : 'Private message'
      )

      return res.status(201).json(message)
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
        if (req.method === 'GET') {
          await logMessageGetFailed(
            user_id,
            { reason: 'unexpected_error', error: error.message },
            'Unexpected error during message retrieval'
          )
        } else {
          await logMessageCreateFailed(
            user_id,
            { reason: 'unexpected_error', error: error.message },
            'Unexpected error during message creation'
          )
        }
      }
    } catch (logError) {
      console.error('[DEBUG] Failed to log error event:', logError)
    }
    
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
} 