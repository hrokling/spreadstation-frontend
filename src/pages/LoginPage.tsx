import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Paper,
    Title,
    TextInput,
    PasswordInput,
    Button,
    Alert,
    Stack,
    Center,
    Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconLogin } from '@tabler/icons-react';
import { useAuth } from '../hooks/useAuth';
import type { LoginRequest } from '../api/auth';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated, isLoginPending, loginError } = useAuth();

    // Get the intended destination from location state (set by ProtectedRoute)
    const from = location.state?.from?.pathname || '/';

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    // Form setup with validation
    const form = useForm<LoginRequest>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => {
                if (!value.trim()) return 'Email is required';
                if (!/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email address';
                return null;
            },
            password: (value) => {
                if (!value) return 'Password is required';
                if (value.length < 3) return 'Password must be at least 3 characters';
                return null;
            },
        },
    });

    // Handle form submission
    const handleSubmit = async (values: LoginRequest) => {
        console.log('🔍 Login attempt with values:', values);
        console.log('🔍 API Base URL:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1');

        try {
            const result = await login(values);
            console.log('✅ Login successful:', result);
            // Navigation will happen automatically via useEffect when isAuthenticated becomes true
        } catch (error) {
            console.error('❌ Login failed:', error);
            console.error('❌ Error details:', {
                message: (error as any)?.message,
                response: (error as any)?.response?.data,
                status: (error as any)?.response?.status,
            });
            // Error is handled by the useAuth hook and displayed via loginError
        }
    };

    // Get error message from the API response
    const getErrorMessage = (error: unknown): string => {
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { data?: { error?: { message?: string } } } };
            return axiosError.response?.data?.error?.message || 'Invalid username or password';
        }
        return 'An unexpected error occurred. Please try again.';
    };

    return (
        <Container size="xs" style={{ minHeight: '100vh' }}>
            <Center style={{ minHeight: '100vh' }}>
                <Box style={{ width: '100%' }}>
                    <Paper shadow="md" p="xl" radius="md" withBorder>
                        <Stack gap="lg">
                            <Center>
                                <Title order={2} ta="center">
                                    SpreadStation Admin
                                </Title>
                            </Center>

                            <Title order={3} ta="center" c="dimmed" size="md">
                                Sign in to your account
                            </Title>

                            {loginError && (
                                <Alert
                                    icon={<IconAlertCircle size={16} />}
                                    color="red"
                                    variant="light"
                                    title="Login Failed"
                                >
                                    {getErrorMessage(loginError)}
                                </Alert>
                            )}

                            <form onSubmit={form.onSubmit(handleSubmit)}>
                                <Stack gap="md">
                                    <TextInput
                                        label="Email"
                                        placeholder="Enter your email address"
                                        required
                                        type="email"
                                        {...form.getInputProps('email')}
                                        disabled={isLoginPending}
                                    />

                                    <PasswordInput
                                        label="Password"
                                        placeholder="Enter your password"
                                        required
                                        {...form.getInputProps('password')}
                                        disabled={isLoginPending}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="md"
                                        loading={isLoginPending}
                                        leftSection={<IconLogin size={16} />}
                                        mt="md"
                                    >
                                        {isLoginPending ? 'Signing in...' : 'Sign In'}
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Paper>
                </Box>
            </Center>
        </Container>
    );
};

export default LoginPage; 