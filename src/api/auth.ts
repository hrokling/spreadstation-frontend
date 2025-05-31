import apiClient from './axiosConfig';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    user: {
        id: string;
        username: string;
        email?: string;
        // Add other user fields as needed based on backend response
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