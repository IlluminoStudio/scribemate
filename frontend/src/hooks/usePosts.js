import { useState, useCallback } from 'react';
import { useAuthenticatedApi } from './useAuthenticatedApi';
import { API_ENDPOINTS } from '../config';

export function usePosts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const makeAuthenticatedApiCall = useAuthenticatedApi();

  // Generate post content from external API
  const generatePost = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use endpoint from config
      const endpoint = API_ENDPOINTS.POSTS_GENERATE;
      
      // Hardcoded request body as specified
      const requestBody = {
        topic: "How to Make Piano Lessons Affordable Amid Rising Costs",
        social_media: "linkedin",
        max_word_count: 150,
        tone_guide: "professional yet friendly, educational"
      };
      
      const response = await makeAuthenticatedApiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || `Failed to generate post: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('API response data:', data);
      
      // Return the generated post data from the response
      return data;
    } catch (err) {
      console.error('Error generating post:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeAuthenticatedApiCall]);

  return {
    loading,
    error,
    generatePost
  };
}
