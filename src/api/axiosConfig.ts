import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token to headers
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage (will be set by auth store)
        const token = localStorage.getItem('auth-token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Track ongoing refresh to prevent multiple concurrent refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });

    failedQueue = [];
};

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Get refresh token from localStorage
                const refreshToken = localStorage.getItem('auth-refresh-token');

                if (refreshToken) {
                    // Attempt to refresh the token
                    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                        refresh_token: refreshToken,
                    });

                    const { access_token, refresh_token: newRefreshToken } = response.data;

                    // Update tokens in localStorage
                    localStorage.setItem('auth-token', access_token);
                    if (newRefreshToken) {
                        localStorage.setItem('auth-refresh-token', newRefreshToken);
                    }

                    // Update the auth store if available
                    try {
                        // Dynamically import to avoid circular dependencies
                        const { useAuthStore } = await import('../store/authStore');
                        const store = useAuthStore.getState();
                        store.updateTokens(access_token, newRefreshToken);
                    } catch (storeError) {
                        console.warn('Could not update auth store:', storeError);
                    }

                    // Process queued requests
                    processQueue(null, access_token);

                    // Update the authorization header for the original request
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    }

                    // Retry the original request with new token
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                // Process queued requests with error
                processQueue(refreshError, null);

                // Refresh failed, clear tokens and redirect to login
                localStorage.removeItem('auth-token');
                localStorage.removeItem('auth-refresh-token');
                localStorage.removeItem('auth-storage'); // Clear Zustand persisted state

                // Clear the auth store if available
                try {
                    const { useAuthStore } = await import('../store/authStore');
                    const store = useAuthStore.getState();
                    store.clearAuth();
                } catch (storeError) {
                    console.warn('Could not clear auth store:', storeError);
                }

                // Redirect to login page
                window.location.href = '/login';

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
export { API_BASE_URL }; 