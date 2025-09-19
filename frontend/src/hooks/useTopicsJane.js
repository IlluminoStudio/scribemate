import { useState, useCallback } from 'react';
import { useAuthenticatedApi } from './useAuthenticatedApi';
import { API_ENDPOINTS } from '../config';

export function useTopicsJane() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const makeAuthenticatedApiCall = useAuthenticatedApi();

  // Fetch topic suggestions from localhost API
  const fetchTopicSuggestions = useCallback(async (industry, topicsToAvoid = '') => {
    try {
      setLoading(true);
      setError(null);
      
      // Use Vercel API route endpoint (same as regular hooks)
      const endpoint = API_ENDPOINTS.TOPICS_SUGGEST;
      
      const requestBody = {
        industry: industry,
        topicsToAvoid: topicsToAvoid
      };
      
      const response = await makeAuthenticatedApiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || `Failed to fetch topic suggestions: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('API response data:', data);
      
      // Return the topics array from the response
      return data.topics || [];
    } catch (err) {
      console.error('Error fetching topic suggestions:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeAuthenticatedApiCall]);

  return {
    loading,
    error,
    fetchTopicSuggestions
  };
}
