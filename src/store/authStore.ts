import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginResponse } from '../api/auth';

export interface User {
    id: string;
    username: string;
    email?: string;
}

interface AuthState {
    // State
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setAuth: (loginResponse: LoginResponse) => void;
    clearAuth: () => void;
    setLoading: (loading: boolean) => void;
    updateTokens: (accessToken: string, refreshToken?: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            // Initial state
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,

            // Set authentication data after successful login
            setAuth: (loginResponse: LoginResponse) => {
                const { access_token, refresh_token, user } = loginResponse;

                // Update localStorage for Axios interceptors
                localStorage.setItem('auth-token', access_token);
                localStorage.setItem('auth-refresh-token', refresh_token);

                // Update Zustand state
                set({
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                });
            },

            // Clear all authentication data
            clearAuth: () => {
                // Clear localStorage
                localStorage.removeItem('auth-token');
                localStorage.removeItem('auth-refresh-token');

                // Clear Zustand state
                set({
                    accessToken: null,
                    refreshToken: null,
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            // Set loading state
            setLoading: (loading: boolean) => {
                set({ isLoading: loading });
            },

            // Update tokens (used by refresh mechanism)
            updateTokens: (accessToken: string, refreshToken?: string) => {
                // Update localStorage for Axios interceptors
                localStorage.setItem('auth-token', accessToken);
                if (refreshToken) {
                    localStorage.setItem('auth-refresh-token', refreshToken);
                }

                // Update Zustand state
                set((state) => ({
                    accessToken,
                    refreshToken: refreshToken || state.refreshToken,
                }));
            },
        }),
        {
            name: 'auth-storage',
            // Only persist essential data, not loading states
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
            // Rehydrate localStorage when store is loaded
            onRehydrateStorage: () => (state) => {
                if (state?.accessToken) {
                    localStorage.setItem('auth-token', state.accessToken);
                }
                if (state?.refreshToken) {
                    localStorage.setItem('auth-refresh-token', state.refreshToken);
                }
            },
        }
    )
); 