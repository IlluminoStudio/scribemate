import { getSupabaseClient } from './supabase.js'
import { logError } from './consoleLogger.js'

/**
 * Check if a carer is associated with a specific coordinator
 * @param {string} carerId - The UUID of the carer to check
 * @param {string} coordinatorId - The UUID of the coordinator to check against
 * @returns {Promise<boolean>} - True if carer is associated with the specified coordinator
 */
export async function isCarerAssociatedWithCoordinator(carerId, coordinatorId) {
  try {
    const supabase = getSupabaseClient()
    
    const { data, error } = await supabase
      .from('view_current_user_profile')
      .select('coordinator_id')
      .eq('id', carerId)
      .single()
    
    if (error) {
      logError('Error checking carer coordinator association: ' + JSON.stringify(error))
      return false
    }
    
    // Return true if coordinator_id matches the specified coordinator
    return data && data.coordinator_id === coordinatorId
  } catch (error) {
    logError('Exception in isCarerAssociatedWithCoordinator: ' + error.message)
    return false
  }
}

/**
 * Get all carers associated with a coordinator
 * @param {string} coordinatorId - The UUID of the coordinator
 * @returns {Promise<Array>} - Array of carer IDs associated with the coordinator
 */
export async function getCarersForCoordinator(coordinatorId) {
  try {
    const supabase = getSupabaseClient()
    
    const { data, error } = await supabase
      .from('view_current_user_profile')
      .select('id')
      .eq('coordinator_id', coordinatorId)
      .eq('role', 'carer')
    
    if (error) {
      logError('Error getting carers for coordinator: ' + JSON.stringify(error))
      return []
    }
    
    return data ? data.map(carer => carer.id) : []
  } catch (error) {
    logError('Exception in getCarersForCoordinator: ' + error.message)
    return []
  }
}

/**
 * Get the coordinator ID for a carer
 * @param {string} carerId - The UUID of the carer
 * @returns {Promise<string|null>} - The coordinator ID or null if not found
 */
export async function getCarerCoordinatorId(carerId) {
  try {
    const supabase = getSupabaseClient()
    
    const { data, error } = await supabase
      .from('view_current_user_profile')
      .select('coordinator_id')
      .eq('id', carerId)
      .single()
    
    if (error) {
      logError('Error getting carer coordinator ID: ' + JSON.stringify(error))
      return null
    }
    
    return data ? data.coordinator_id : null
  } catch (error) {
    logError('Exception in getCarerCoordinatorId: ' + error.message)
    return null
  }
} 