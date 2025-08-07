import { useState, useCallback } from 'react';
import { useAuthenticatedApi } from './useAuthenticatedApi';
import { getApiUrl } from '../config';

export function useMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const makeAuthenticatedApiCall = useAuthenticatedApi();

  // Fetch messages (optionally filtered by status)
  const fetchMessages = useCallback(async (status = null) => {
    try {
      setLoading(true);
      setError(null);
      
      let endpoint = getApiUrl('/message');
      if (status) {
        const separator = endpoint.includes('?') ? '&' : '?';
        endpoint = `${endpoint}${separator}status=${encodeURIComponent(status)}`;
      }
      
      const response = await makeAuthenticatedApiCall(endpoint);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeAuthenticatedApiCall]);

  // Send a new message
  const sendMessage = useCallback(async (messageData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await makeAuthenticatedApiCall(getApiUrl('/message'), {
        method: 'POST',
        body: JSON.stringify(messageData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || `Failed to send message: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeAuthenticatedApiCall]);

  return {
    loading,
    error,
    fetchMessages,
    sendMessage
  };
} 