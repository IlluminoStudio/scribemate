import { useState, useEffect, useCallback } from 'react';
import { useAuthenticatedApi } from './useAuthenticatedApi';
import { getApiUrl } from '../config';

export function useUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const makeAuthenticatedApiCall = useAuthenticatedApi();

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await makeAuthenticatedApiCall(getApiUrl('/user'));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [makeAuthenticatedApiCall]);

  // Filter users by role
  const getUsersByRole = useCallback((role) => {
    return users.filter(user => user.role === role);
  }, [users]);

  // Get carers specifically
  const getCarers = useCallback(() => {
    return getUsersByRole('carer');
  }, [getUsersByRole]);

  // Initialize on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    getUsersByRole,
    getCarers
  };
} 