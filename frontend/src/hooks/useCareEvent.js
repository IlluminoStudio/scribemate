import { useState, useEffect, useCallback } from 'react';
import { useAuthenticatedApi } from './useAuthenticatedApi';
import { getApiUrl } from '../config';

export function useCareEvent() {
  const [careEvents, setCareEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const makeAuthenticatedApiCall = useAuthenticatedApi();

  // Fetch care events from API
  const fetchCareEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await makeAuthenticatedApiCall(getApiUrl('/care-event/today'));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch care events: ${response.status}`);
      }
      
      const data = await response.json();
      setCareEvents(data);
    } catch (err) {
      console.error('Error fetching care events:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [makeAuthenticatedApiCall]);

  // Transform API data to component format
  const transformCareEvents = useCallback((apiEvents) => {
    if (!apiEvents) return [];
    
    // Filter to only include clock_in and clock_out events
    const clockEvents = apiEvents.filter(event => 
      event.event_type === 'clock_in' || event.event_type === 'clock_out'
    );
    
    // Transform API response to match DailyView component expectations
    return clockEvents.map(event => ({
      name: event.carer_name,
      initial: event.initial,
      event: event.event_type === 'clock_in' ? 'clockIn' : 'clockOut',
      time: parseInt(event.time_of_day, 10) // Convert string to number
    }));
  }, []);

  // Initialize on mount
  useEffect(() => {
    fetchCareEvents();
  }, [fetchCareEvents]);

  return {
    careEvents: transformCareEvents(careEvents),
    loading,
    error,
    refetch: fetchCareEvents
  };
} 