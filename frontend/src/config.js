// Application configuration
// This file contains the base domain and URL construction helpers

// Base domain for the application - localhost in dev, custom domain in production
export const BASE_DOMAIN = import.meta.env.DEV 
  ? 'http://localhost:3001' 
  : 'https://scribemate.jialinwang.pro';

// API base URL - use proxy in development, full URL in production
export const API_BASE_URL = import.meta.env.DEV ? '/api' : `${BASE_DOMAIN}/api`;

// Helper function to construct API URLs
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

// API Key for authentication
export const X_API_KEY = import.meta.env.VITE_X_API_KEY;

// Helper function to construct any URL from base domain
export const getUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_DOMAIN}${cleanPath}`;
};

// API Endpoints - use Vercel API routes
export const API_ENDPOINTS = {
  TOPICS_SUGGEST: '/api/v1/topics:suggest',
  POSTS_GENERATE: '/api/v1/posts:generate',
}; 