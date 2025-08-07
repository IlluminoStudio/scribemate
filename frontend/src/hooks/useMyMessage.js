import { useState, useEffect, useCallback } from 'react';
import { useAuthenticatedApi } from './useAuthenticatedApi';
import { getApiUrl } from '../config';
import { getRelativeTimeText } from '../utils/common';

export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const makeAuthenticatedApiCall = useAuthenticatedApi();

  // Fetch messages from API
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await makeAuthenticatedApiCall(getApiUrl('/my-message'));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [makeAuthenticatedApiCall]);

  // Acknowledge a message
  const acknowledgeMessage = useCallback(async (messageId) => {
    try {
      const requestBody = {
        message_id: String(messageId) // Ensure message_id is a string
      };
      
      console.log('Acknowledging message:', { messageId, requestBody });
      
      const response = await makeAuthenticatedApiCall(getApiUrl('/my-message'), {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to acknowledge message: ${response.status} - ${errorText}`);
      }
      
      // Refresh messages after acknowledgment
      await fetchMessages();
    } catch (err) {
      console.error('Error acknowledging message:', err);
      throw err;
    }
  }, [makeAuthenticatedApiCall, fetchMessages]);

  // Format time for display
  const formatTime = useCallback((sentAt) => {
    return getRelativeTimeText(sentAt);
  }, []);

  // Transform API data to component format
  const transformMessages = useCallback((apiMessages) => {
    // Sort messages: unread first (newest to oldest), then acknowledged (newest to oldest)
    const sortedMessages = [...apiMessages].sort((a, b) => {
      // First, sort by status: unread messages come first
      if (a.status !== b.status) {
        return a.status === 'unread' ? -1 : 1;
      }
      // Then sort by sent_at in descending order (newest first)
      return new Date(b.sent_at) - new Date(a.sent_at);
    });

    return sortedMessages.map(msg => ({
      id: msg.message_id, // Use message_id from API response
      variant: msg.status === 'acknowledged' ? 'old' : 'new', // Use status field
      heading: msg.title,
      description: msg.body,
      time: formatTime(msg.sent_at),
      onAcknowledge: msg.status === 'acknowledged' ? undefined : () => acknowledgeMessage(msg.message_id)
    }));
  }, [formatTime, acknowledgeMessage]);

  // Initialize on mount
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages: transformMessages(messages),
    loading,
    error,
    refetch: fetchMessages,
    acknowledgeMessage
  };
} 