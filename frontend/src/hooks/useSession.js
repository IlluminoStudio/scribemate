import { useState, useEffect, useCallback, useRef } from 'react';
import { SESSION_EXPIRY_SECONDS } from '../constants';

export function useUserData() {
  const [userData, setUserData] = useState(null);
  const debounceTimeoutRef = useRef(null);

  // Read user data from localStorage
  const readUserData = useCallback(() => {
    try {
      const currentUserStr = localStorage.getItem('currentUser');
      if (!currentUserStr) {
        setUserData(null);
        return null;
      }
      
      const currentUser = JSON.parse(currentUserStr);
      setUserData(currentUser);
      
      return currentUser;
    } catch (error) {
      console.error('Error reading currentUser from localStorage:', error);
      setUserData(null);
      return null;
    }
  }, []);

  // Fresh session check to always returns current truth
  const checkSessionFresh = useCallback(() => {
    try {
      const currentUserStr = localStorage.getItem('currentUser');
      if (!currentUserStr) {
        return { isValid: false, user: null };
      }
      
      const currentUser = JSON.parse(currentUserStr);
      const isExpired = Date.now() > currentUser.expiry;
      
      return { isValid: !isExpired, user: currentUser };
    } catch (error) {
      console.error('Error checking session:', error);
      return { isValid: false, user: null };
    }
  }, []);

  // Check if session is valid - runtime function that always returns fresh result
  const isSessionValid = useCallback(() => {
    const { isValid } = checkSessionFresh();
    return isValid;
  }, [checkSessionFresh]);

  // Update session expiry with debouncing - only if session is still valid
  const updateSessionExpiry = useCallback(() => {
    // Check if session is still valid before extending
    const { isValid, user } = checkSessionFresh();
    if (!isValid || !user) {
      return;
    }

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout to update expiry after 30 seconds
    debounceTimeoutRef.current = setTimeout(() => {
      try {
        // Double-check session is still valid before updating
        const { isValid: stillValid, user: currentUser } = checkSessionFresh();
        if (!stillValid || !currentUser) {
          return; // Don't update if session expired during the timeout
        }

        const updatedUserData = {
          ...currentUser,
          expiry: Date.now() + (SESSION_EXPIRY_SECONDS * 1000)
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        console.log('Session expiry updated');
      } catch (error) {
        console.error('Error updating session expiry:', error);
      }
    }, 30000); // 30 second debounce
  }, [checkSessionFresh]);

  // Check session validity before API calls
  const checkSessionBeforeApiCall = useCallback(() => {
    const { isValid, user } = checkSessionFresh();
    if (!user) {
      throw new Error('No user session found. Please log in again.');
    }
    
    if (!isValid) {
      throw new Error('Session expired. Please log out and log in again.');
    }
    
    return user;
  }, [checkSessionFresh]);

  // Get user ID for API calls
  const getUserId = useCallback(() => {
    const currentUser = checkSessionBeforeApiCall();
    return currentUser.id;
  }, [checkSessionBeforeApiCall]);

  // Update user data in localStorage
  const updateUserData = useCallback((updates) => {
    try {
      const currentUserStr = localStorage.getItem('currentUser');
      if (!currentUserStr) {
        console.error('No currentUser found in localStorage');
        return false;
      }
      
      const currentUser = JSON.parse(currentUserStr);
      const updatedUserData = {
        ...currentUser,
        ...updates
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      console.log('User data updated in localStorage:', updates);
      return true;
    } catch (error) {
      console.error('Error updating user data:', error);
      return false;
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    readUserData();
    
    // Extend session on page load if user is active
    const { isValid, user } = checkSessionFresh();
    if (isValid && user) {
      updateSessionExpiry();
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [readUserData, checkSessionFresh, updateSessionExpiry]);

  return {
    userData,
    isSessionValid,
    readUserData,
    updateSessionExpiry,
    checkSessionBeforeApiCall,
    checkSessionFresh,
    getUserId,
    updateUserData
  };
} 