import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7236/api',
  withCredentials: true, // Crucial for sending/receiving HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// A simple response interceptor to handle global errors (e.g. 401s)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we receive a 401, the user's cookie expired or is invalid.
    // Zustand store will need to reflect this, but we'll manage router logic elsewhere.
    return Promise.reject(error);
  }
);
