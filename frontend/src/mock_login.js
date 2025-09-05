// Mock login utility to simulate user authentication
// This writes user data to localStorage to simulate a logged-in state

import { userData } from '../../tests/mock-profile/user-data.js';
import { SESSION_EXPIRY_SECONDS } from './constants.js';

/**
 * Simulates a user login by writing user data to localStorage
 * This creates a mock currentUser object with the expected structure
 */
export function mockLogin() {
  try {
    // Create the currentUser object with the expected structure
    const currentUser = {
      id: 1, // Mock user ID
      username: userData.first_name.toLowerCase() + userData.last_name.toLowerCase(),
      role: 'user',
      expiry: Date.now() + (SESSION_EXPIRY_SECONDS * 1000), // 2 hours from now
      // Elevate all profile elements to top level
      first_name: userData.first_name,
      last_name: userData.last_name,
      industry: userData.industry,
      tone_guide: userData.tone_guide,
      topics: userData.topics,
      business: userData.business,
      pro_tips: userData.pro_tips
    };

    // Write to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    return currentUser;
  } catch (error) {
    console.error('Mock login failed:', error);
    return null;
  }
}

/**
 * Clears the mock login data from localStorage
 */
export function mockLogout() {
  try {
    localStorage.removeItem('currentUser');
    console.log('Mock logout successful');
    return true;
  } catch (error) {
    console.error('Mock logout failed:', error);
    return false;
  }
}

/**
 * Checks if a mock user is currently logged in
 */
export function isMockLoggedIn() {
  try {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) return false;
    
    const currentUser = JSON.parse(currentUserStr);
    const isExpired = Date.now() > currentUser.expiry;
    
    return !isExpired;
  } catch (error) {
    console.error('Error checking mock login status:', error);
    return false;
  }
}

/**
 * Gets the current mock user data
 */
export function getMockUserData() {
  try {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) return null;
    
    const currentUser = JSON.parse(currentUserStr);
    const isExpired = Date.now() > currentUser.expiry;
    
    return isExpired ? null : currentUser;
  } catch (error) {
    console.error('Error getting mock user data:', error);
    return null;
  }
}
