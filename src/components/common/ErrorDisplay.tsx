import { Alert, Button, Group, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import {
    IconAlertCircle,
    IconExclamationMark,
    IconInfoCircle,
    IconRefresh
} from '@tabler/icons-react';

export type ErrorSeverity = 'error' | 'warning' | 'info';

interface ErrorDisplayProps {
    title?: string;
    message: string | ReactNode;
    severity?: ErrorSeverity;
    onRetry?: () => void;
    retryLabel?: string;
    retryLoading?: boolean;
    showIcon?: boolean;
    variant?: 'light' | 'filled' | 'outline';
}

const severityConfig: Record<ErrorSeverity, {
    color: string;
    icon: ReactNode;
    defaultTitle: string;
}> = {
    error: {
        color: 'red',
        icon: <IconAlertCircle size={16} />,
        defaultTitle: 'Error'
    },
    warning: {
        color: 'orange',
        icon: <IconExclamationMark size={16} />,
        defaultTitle: 'Warning'
    },
    info: {
        color: 'blue',
        icon: <IconInfoCircle size={16} />,
        defaultTitle: 'Information'
    }
};

export default function ErrorDisplay({
    title,
    message,
    severity = 'error',
    onRetry,
    retryLabel = 'Try Again',
    retryLoading = false,
    showIcon = true,
    variant = 'light'
}: ErrorDisplayProps) {
    const config = severityConfig[severity];
    const displayTitle = title || config.defaultTitle;

    return (
        <Alert
            color={config.color}
            title={displayTitle}
            icon={showIcon ? config.icon : undefined}
            variant={variant}
        >
            <Stack gap="sm">
                <Text size="sm">
                    {message}
                </Text>

                {onRetry && (
                    <Group justify="flex-start">
                        <Button
                            size="xs"
                            variant="light"
                            color={config.color}
                            leftSection={<IconRefresh size={14} />}
                            onClick={onRetry}
                            loading={retryLoading}
                        >
                            {retryLabel}
                        </Button>
                    </Group>
                )}
            </Stack>
        </Alert>
    );
} 