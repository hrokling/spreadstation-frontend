import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Alert, Button, Container, Stack, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log the error to console and potentially to an error reporting service
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });

        // TODO: Log to error reporting service (e.g., Sentry)
        // logErrorToService(error, errorInfo);
    }

    handleReset = (): void => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    handleReload = (): void => {
        window.location.reload();
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            const isDevelopment = import.meta.env.DEV;

            // Default error UI
            return (
                <Container size="sm" py="xl">
                    <Stack gap="lg" align="center">
                        <Alert
                            icon={<IconAlertTriangle size={24} />}
                            title="Something went wrong"
                            color="red"
                            variant="light"
                            className="w-full"
                        >
                            <Stack gap="sm">
                                <Text size="sm">
                                    An unexpected error occurred while rendering this page. This has been logged and our team will investigate.
                                </Text>

                                {isDevelopment && this.state.error && (
                                    <details className="mt-2">
                                        <summary className="cursor-pointer text-sm font-medium">
                                            Error Details (Development Only)
                                        </summary>
                                        <div className="mt-2 p-3 bg-gray-50 rounded text-xs font-mono overflow-auto">
                                            <div className="text-red-600 font-semibold">
                                                {this.state.error.name}: {this.state.error.message}
                                            </div>
                                            <pre className="mt-2 whitespace-pre-wrap">
                                                {this.state.error.stack}
                                            </pre>
                                            {this.state.errorInfo && (
                                                <pre className="mt-2 whitespace-pre-wrap">
                                                    {this.state.errorInfo.componentStack}
                                                </pre>
                                            )}
                                        </div>
                                    </details>
                                )}
                            </Stack>
                        </Alert>

                        <Stack gap="sm" align="center">
                            <Title order={3} ta="center" c="dimmed">
                                Don't worry, you can try again
                            </Title>

                            <div className="flex gap-3">
                                <Button
                                    variant="light"
                                    leftSection={<IconRefresh size={16} />}
                                    onClick={this.handleReset}
                                >
                                    Try Again
                                </Button>
                                <Button
                                    variant="filled"
                                    onClick={this.handleReload}
                                >
                                    Reload Page
                                </Button>
                            </div>
                        </Stack>
                    </Stack>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 