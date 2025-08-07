// Common utility functions for the app
// Add more shared helpers here as needed

import { getApiUrl } from '../config';

// Returns the current time as an integer, e.g., 1823 for 6:23PM
export function getCurrentTimeInt() {
  const now = new Date();
  return now.getHours() * 100 + now.getMinutes();
}

// Converts 24hr int (e.g., 630) to '6:30AM'
export function formatTime(num) {
  let hour = Math.floor(num / 100);
  let min = num % 100;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  if (hour === 0) hour = 12;
  if (hour > 12) hour -= 12;
  return `${hour}:${min.toString().padStart(2, '0')}${ampm}`;
}

// Adds minutes to a 24hr int time (e.g., 630 + 29 -> 659)
export function addMinutes(time, mins) {
  let hour = Math.floor(time / 100);
  let min = time % 100;
  min += mins;
  hour += Math.floor(min / 60);
  min = min % 60;
  return hour * 100 + min;
}

// Generates all half-hour start times for 6AM-9PM (e.g., 600, 630, ..., 2030)
export function getDayBlocks() {
  const blocks = [];
  for (let h = 6; h < 21; h++) {
    blocks.push(h * 100);
    blocks.push(h * 100 + 30);
  }
  return blocks;
}

// Converts hex color to rgba string with given opacity
export function hexToRgba(hex, opacity) {
  hex = hex.replace('#', '');
  // Support short hex (#abc)
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Converts a hex color or CSS var to a transparent color (default 0.85 opacity)
export function getTransparentColor(color, opacity = 0.85) {
  if (color.startsWith('var(--')) return color;
  if (color.startsWith('#')) return hexToRgba(color, opacity);
  return color;
}

// Extracts initials from a full name (e.g., 'Sarah Chen' -> 'SC', 'John' -> 'J')
export function getInitials(name) {
  if (!name || typeof name !== 'string') return '';
  
  // Trim whitespace and split by spaces
  const parts = name.trim().split(/\s+/);
  
  // Filter out empty parts and get first character of each
  const initials = parts
    .filter(part => part.length > 0)
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
  
  // Return up to 2 initials (first and last name)
  return initials.slice(0, 2);
}

/**
 * Handles user logout by:
 * 1. Removing currentUser from localStorage
 * 2. Calling the logout API endpoint
 * 3. Clearing browser history to disable back/forward buttons
 * 4. Redirecting to homepage
 * 
 * This function is reusable across components
 */
export async function handleLogout() {
  try {
    // Get current user from localStorage
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      
      // Call logout API to log the event
      await fetch(`/api/auth/logout?user_id=${currentUser.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    // Log error but don't block logout process
    console.error('Logout API call failed:', error);
  } finally {
    // Always remove localStorage and redirect, even if API call fails
    localStorage.removeItem('currentUser');
    
    // Clear browser history to disable back/forward buttons
    // This replaces the current history entry with the homepage
    window.history.replaceState(null, '', '/');
    
    // Clear all history entries and start fresh
    window.history.pushState(null, '', '/');
    
    // Redirect to homepage
    window.location.href = '/';
  }
}



/**
 * Converts a timestamp to human-readable relative time text
 * @param {number|string|Date} timestamp - The timestamp to compare
 * @returns {string} - Relative time string like "2s ago", "2 hours ago", or empty string if not in past
 */
export function getRelativeTimeText(timestamp) {
  // Convert timestamp to Date object if it's not already
  const inputDate = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const now = new Date();
  
  // Return empty if timestamp is not before current time
  if (inputDate >= now) {
    return '';
  }
  
  const diffMs = now - inputDate;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30.44); // Average days per month
  const diffYears = Math.floor(diffDays / 365.25); // Average days per year
  
  // Return the smallest applicable unit
  if (diffSeconds < 60) {
    return `${diffSeconds}s ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
  }
}

/**
 * Formats a timestamp to a readable time string (e.g., "9:02 AM")
 * @param {string|Date} timestamp - The timestamp to format
 * @returns {string} - Formatted time string
 */
export function formatTimeFromTimestamp(timestamp) {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Calculates duration between a start timestamp and current time
 * @param {string|Date} startTimestamp - The start timestamp
 * @returns {string} - Duration string like "4h 27m" or "2h 15m"
 */
export function calculateDuration(startTimestamp) {
  const startDate = startTimestamp instanceof Date ? startTimestamp : new Date(startTimestamp);
  const now = new Date();
  
  const diffMs = now - startDate;
  // If within 1 minute (before or after), return 'now'
  if (Math.abs(diffMs) <= 60000) {
    return 'now';
  }
  const diffMinutes = Math.floor(Math.abs(diffMs) / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const remainingMinutes = diffMinutes % 60;
  
  if (diffHours === 0) {
    return `${remainingMinutes}m`;
  } else if (remainingMinutes === 0) {
    return `${diffHours}h`;
  } else {
    return `${diffHours}h ${remainingMinutes}m`;
  }
}