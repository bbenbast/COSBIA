// Determine the base URL based on environment
const isDevelopment = process.env.NODE_ENV === 'development';

// For production, use the environment variable; for development, fallback to localhost
export const API_BASE_URL = isDevelopment
  ? process.env.REACT_APP_API_URL || 'http://localhost:5000'
  : process.env.REACT_APP_API_URL; // Must be set in production

// Optional: Create an axios instance with baseURL
import axios from 'axios';
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});