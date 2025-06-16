import axios from 'axios';

// Direct hardcoded URL with /api path
// const API_URL = 'http://69.62.76.191:5005/api';
const API_URL = 'http://95.216.238.235:5005/api';

// Create a dedicated API client for auth operations with proper baseURL
const authClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});
// great direct url

// Add a debug interceptor to log all request URLs
authClient.interceptors.request.use(
  (config) => {
    console.log(`Auth request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

/**
 * Register a new user
 */
export const register = async (
  email: string, 
  username: string, 
  password: string
): Promise<AuthResponse> => {
  try {
    // Use the authClient with proper URL construction
    const response = await authClient.post('/auth/register', {
      email,
      username,
      password
    });
    
    if (response.data.user && response.data.token) {
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed'
    };
  }
};

/**
 * Login a user
 */
export const login = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  try {
    // Use the authClient with proper URL construction
    const response = await authClient.post('/auth/login', {
      email,
      password
    });
    
    if (response.data.user && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed'
    };
  }
};

/**
 * Login with Google
 */
export const googleLogin = async (token: string): Promise<AuthResponse> => {
  try {
    // Use the authClient with proper URL construction
    const response = await authClient.post('/auth/google', { token });
    
    if (response.data.user && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Google login failed'
    };
  }
};

/**
 * Logout the user
 */
export const logout = async (): Promise<{ success: boolean; message?: string }> => {
  try {
    // Use the authClient with proper URL construction
    await authClient.post('/auth/logout');
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return { success: true };
  } catch (error: any) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return {
      success: false,
      message: error.response?.data?.message || 'Logout failed but session cleared locally'
    };
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;  
  }
  
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') {
    return false;  
  }
  
  return !!localStorage.getItem('token');
};

/**
 * Update user profile
 */
export const updateProfile = async (
  userId: string,
  username: string,
  newPassword?: string
): Promise<AuthResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return {
        success: false,
        message: 'Not authenticated'
      };
    }
    
    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    const updateData: any = { username };
    if (newPassword) {
      updateData.password = newPassword;
    }
    
    // Use the authClient with proper URL construction
    const response = await authClient.put(
      `/users/${userId}`,
      updateData,
      { headers }
    );
    
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Profile update failed'
    };
  }
};

/**
 * Get authentication token
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null; // For SSR
  }
  
  return localStorage.getItem('token');
};

// Export a configured axios instance for authenticated requests
export const authAxios = axios.create({
  baseURL: API_URL
});

authAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`AuthAxios request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);