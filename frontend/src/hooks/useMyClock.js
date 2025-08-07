import { useState, useEffect, useCallback } from 'react';
import { useAuthenticatedApi } from './useAuthenticatedApi';
import { getApiUrl } from '../config';
import { formatTimeFromTimestamp, calculateDuration } from '../utils/common';

export function useMyClock() {
  const [clockData, setClockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const makeAuthenticatedApiCall = useAuthenticatedApi();

  // Fetch clock status from API
  const fetchClockStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await makeAuthenticatedApiCall(getApiUrl('/my-clock-status'));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch clock status: ${response.status}`);
      }
      
      const data = await response.json();
      setClockData(data);
    } catch (err) {
      console.error('Error fetching clock status:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [makeAuthenticatedApiCall]);

  // Transform API data to component format
  const transformClockData = useCallback((apiData) => {
    if (!apiData) return null;
    
    const isClockIn = apiData.event_type === 'clock_in';
    const startTime = formatTimeFromTimestamp(apiData.event_time);
    const duration = isClockIn ? calculateDuration(apiData.event_time) : null;
    
    // Format date for display
    const eventDate = new Date(apiData.event_time);
    const date = eventDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    return {
      isClockIn,
      startTime,
      date,
      duration
    };
  }, []);

  // Initialize on mount
  useEffect(() => {
    fetchClockStatus();
  }, [fetchClockStatus]);

  return {
    clockData: transformClockData(clockData),
    loading,
    error,
    refetch: fetchClockStatus
  };
} 