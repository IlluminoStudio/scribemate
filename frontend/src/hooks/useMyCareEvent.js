import { useCallback } from 'react';
import { useAuthenticatedApi } from './useAuthenticatedApi';
import { useUserData } from './useSession';
import { getApiUrl } from '../config';

export function useMyCareEvent() {
  const makeAuthenticatedApiCall = useAuthenticatedApi();
  const { getUserId } = useUserData();

  // Create a care event (clock in/out)
  const createCareEvent = useCallback(async (eventType, notes = '') => {
    try {
      const userId = getUserId();
      const requestBody = {
        carer_id: userId, // Use the authenticated user's ID
        event_type: eventType,
        notes: notes
      };
      
      console.log('Creating care event:', { eventType, notes, requestBody });
      
      const response = await makeAuthenticatedApiCall(getApiUrl('/my-care-event'), {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to create care event: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error creating care event:', err);
      throw err;
    }
  }, [makeAuthenticatedApiCall, getUserId]);

  return {
    createCareEvent
  };
} 