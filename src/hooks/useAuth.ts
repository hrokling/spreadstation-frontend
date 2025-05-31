import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { login as apiLogin, logout as apiLogout } from '../api/auth';
import type { LoginRequest } from '../api/auth';

export const useAuth = () => {
    const queryClient = useQueryClient();
    const {
        user,
        isAuthenticated,
        isLoading,
        setAuth,
        clearAuth,
        setLoading,
    } = useAuthStore();

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: (credentials: LoginRequest) => apiLogin(credentials),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (data) => {
            setAuth(data);
            // Invalidate and refetch any cached queries after login
            queryClient.invalidateQueries();
        },
        onError: () => {
            setLoading(false);
        },
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: () => apiLogout(),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            clearAuth();
            // Clear all cached queries on logout
            queryClient.clear();
        },
        onError: () => {
            // Even if logout API call fails, clear local state
            clearAuth();
            queryClient.clear();
        },
    });

    const login = (credentials: LoginRequest) => {
        return loginMutation.mutateAsync(credentials);
    };

    const logout = () => {
        return logoutMutation.mutateAsync();
    };

    return {
        // State
        user,
        isAuthenticated,
        isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,

        // Actions
        login,
        logout,

        // Mutation states for more granular control
        loginError: loginMutation.error,
        logoutError: logoutMutation.error,
        isLoginPending: loginMutation.isPending,
        isLogoutPending: logoutMutation.isPending,
    };
}; 