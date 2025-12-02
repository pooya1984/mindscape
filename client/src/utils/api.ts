// API utility using native Fetch API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
}

// Set auth token in localStorage
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// API request wrapper with auto token injection
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    (defaultHeaders as Record<string, string>)['x-auth-token'] = token;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // Parse response
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Handle error response
      const errorMessage = data.msg || data.message || `HTTP error! status: ${response.status}`;
      
      // Don't log 401 errors (expected when not authenticated)
      // Don't log 400 errors with "no profile" message (expected for new users)
      if (response.status !== 401 && !(response.status === 400 && errorMessage.toLowerCase().includes('no profile'))) {
        console.error('API Request Error:', errorMessage);
      }
      
      throw new Error(errorMessage);
    }

    return data as T;
  } catch (error) {
    // Only log unexpected errors (not 401 unauthorized or no profile errors)
    if (error instanceof Error && 
        !error.message.includes('authorization denied') && 
        !error.message.includes('401') &&
        !error.message.toLowerCase().includes('no profile')) {
      console.error('API Request Error:', error);
    }
    throw error;
  }
};

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),

  patch: <T = any>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),
};

export default api;
