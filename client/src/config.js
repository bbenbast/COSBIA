import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';

export const API_BASE_URL = isDevelopment
  ? process.env.REACT_APP_API_URL || 'http://localhost:5000'
  : process.env.REACT_APP_API_URL;


export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});