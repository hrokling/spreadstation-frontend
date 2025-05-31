import apiClient from './axiosConfig';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    user: {
        user_id: number;
        email: string;
        role: string;
        full_name: string;
        status: string;
        email_verified: boolean;
        last_login_at: string;
        created_at: string;
    };
}

export interface RefreshTokenRequest {
    refresh_token: string;
}

export interface RefreshTokenResponse {
    access_token: string;
    refresh_token?: string;
    token_type: string;
}

/**
 * Authenticate user with username and password
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
};

/**
 * Refresh the access token using refresh token
 */
export const refreshToken = async (refreshTokenData: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', refreshTokenData);
    return response.data;
};

/**
 * Logout user and invalidate tokens on the server
 */
export const logout = async (): Promise<void> => {
    await apiClient.post('/auth/logout');
}; 