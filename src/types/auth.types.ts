import type { ReactNode } from 'react';

/**
 * Props for the ProtectedRoute component
 */
export interface ProtectedRouteProps {
    /** The component(s) to render when user is authenticated */
    children: ReactNode;
    /** Optional: Required role for access (future enhancement) */
    roleRequired?: string;
    /** Optional: Custom redirect path for unauthenticated users */
    redirectTo?: string;
}

/**
 * User roles for role-based access control (future enhancement)
 */
export type UserRole = 'admin' | 'user' | 'viewer';

/**
 * Extended user interface with role support (future enhancement)
 */
export interface UserWithRole {
    id: string;
    username: string;
    email?: string;
    role?: UserRole;
} 