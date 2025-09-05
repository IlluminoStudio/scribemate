import { useState, useCallback } from 'react';
import { useAuthenticatedApi } from './useAuthenticatedApi';

export function useTopics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const makeAuthenticatedApiCall = useAuthenticatedApi();

  // Fetch topic suggestions from external API
  const fetchTopicSuggestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Hardcoded endpoint as requested
    //   const endpoint = 'http://localhost:3001/api/v1/topics:suggest';
      const endpoint = 'https://my.api.mockaroo.com/api/v1/topics:suggest';
      
      // Hardcoded body as requested
      const requestBody = {
        industry: 'private piano teaching'
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
      return data;
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
