import axios from 'axios';
import { getToken, removeToken } from '../utils/token.utils';
import { useAuthStore } from '../store/auth.store';

const normalizeBaseURL = (baseURL) => baseURL.replace(/\/$/, '');

const axiosInstance = axios.create({
  // In local development, keep this relative so Vite can proxy `/api` to the Express server.
  // In production, set VITE_API_BASE_URL to your deployed backend URL, for example:
  // https://api.your-domain.com/api/v1
  baseURL: normalizeBaseURL(import.meta.env.VITE_API_BASE_URL || '/api/v1'),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
