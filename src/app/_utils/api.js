import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Function to create the Axios instance
const createApiInstance = () => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });

  // Attach the token to headers if it exists
  const token = localStorage.getItem('authToken');
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return instance;
};

const api = createApiInstance();

// Function to add Authorization token to headers
export const addAuthToken = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Request interceptor to add Authorization token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor to handle 401 errors
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('authRefreshToken');
      if (!refreshToken) {
        // If no refresh token, redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('authRefreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Attempt to refresh token
      try {
        const response = await axios.post(`${API_URL}/refresh-token`, {
          refreshToken: refreshToken,
        });

        const { authToken } = response.data;

        // Update local storage with new tokens
        localStorage.setItem('authToken', authToken);
        addAuthToken();

        // Retry the original request
        return api.request(error.config);
      } catch (refreshError) {
        // If refresh token fails, remove tokens and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('authRefreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// handle 403 Forbidden
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 403) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// handle 404 Not Found
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 404) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// handle 500 Internal Server Error
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 500) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
