import axios from 'axios';

// Create axios instance with direct URL config
const apiClient = axios.create({
  // baseURL: 'http://69.62.76.191:5005/api',
  baseURL: 'http://95.216.238.235:5005/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
// fd
// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      // Clear token if unauthorized
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        
        // Redirect to login page if not already there
        if (!window.location.pathname.includes('/auth/signin')) {
          window.location.href = '/auth/signin';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;