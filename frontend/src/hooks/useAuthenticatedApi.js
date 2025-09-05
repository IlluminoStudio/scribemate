import { useCallback } from 'react';
import { useUserData } from './useSession';
import { X_API_KEY } from '../config';

/**
 * Custom hook for making authenticated API calls
 * @returns {Function} - Function to make authenticated API calls
 */
export function useAuthenticatedApi() {
  const { getUserId } = useUserData();
  
  const makeAuthenticatedApiCall = useCallback(async (endpoint, options = {}) => {
    // Get user ID - this will throw if session is invalid
    const userId = getUserId();
    
    // Build URL with user_id parameter
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${endpoint}${separator}user_id=${userId}`;
    
    // Make the API call
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': X_API_KEY,
        ...options.headers,
      },
    });
  }, [getUserId]);
  
  return makeAuthenticatedApiCall;
} 