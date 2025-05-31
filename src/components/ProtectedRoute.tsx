import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { useAuthStore } from '../store/authStore';
import type { ProtectedRouteProps } from '../types/auth.types';

/**
 * ProtectedRoute component that restricts access to authenticated users only.
 * 
 * Features:
 * - Checks authentication status from the auth store
 * - Shows loading spinner while authentication is being verified
 * - Redirects unauthenticated users to login page with return URL
 * - Renders protected content for authenticated users
 * - Future-ready for role-based access control
 * 
 * @example
 * ```tsx
 * <ProtectedRoute>
 *   <InstrumentsPage />
 * </ProtectedRoute>
 * ```
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    roleRequired,
    redirectTo = '/login',
}) => {
    const location = useLocation();
    const { isAuthenticated, isLoading, user } = useAuthStore();

    // Show loading spinner while authentication status is being determined
    if (isLoading) {
        return (
            <Center style={{ height: '50vh' }}>
                <Loader size="lg" />
            </Center>
        );
    }

    // Redirect to login if not authenticated
    // Include current location in state so user can be redirected back after login
    if (!isAuthenticated) {
        return (
            <Navigate
                to={redirectTo}
                state={{ from: location }}
                replace
            />
        );
    }

    // Future enhancement: Role-based access control
    if (roleRequired && user) {
        // TODO: Implement role checking when user roles are added to the backend
        // const userRole = (user as UserWithRole).role;
        // if (!userRole || userRole !== roleRequired) {
        //   return <Navigate to="/unauthorized" replace />;
        // }
    }

    // User is authenticated (and has required role if specified)
    return <>{children}</>;
};

export default ProtectedRoute; 