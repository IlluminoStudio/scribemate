import { useState, useCallback } from 'react';
import { useAuthenticatedApi } from './useAuthenticatedApi';
import { API_ENDPOINTS } from '../config';

export function usePostsJane() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const makeAuthenticatedApiCall = useAuthenticatedApi();

  // Generate post content from localhost API
  const generatePost = useCallback(async (topic, tone_guide, social_media = 'facebook', max_word_count = 150, additional_context = '') => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate required parameters
      if (!topic) {
        throw new Error('Topic is required');
      }
      if (!tone_guide) {
        throw new Error('Tone guide is required');
      }
      
      // Use Vercel API route endpoint (same as regular hooks)
      const endpoint = API_ENDPOINTS.POSTS_GENERATE;
      
      // Build request body with provided parameters
      const requestBody = {
        topic,
        social_media,
        max_word_count,
        tone_guide,
        additional_context
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
