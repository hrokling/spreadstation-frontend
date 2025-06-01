import { Badge } from '@mantine/core';
import type { BadgeProps } from '@mantine/core';

export type StatusType =
    | 'active'
    | 'inactive'
    | 'connected'
    | 'disconnected'
    | 'healthy'
    | 'unhealthy'
    | 'running'
    | 'stopped'
    | 'pending'
    | 'error'
    | 'success'
    | 'warning'
    | 'fresh'
    | 'stale';

interface StatusBadgeProps extends Omit<BadgeProps, 'color' | 'variant'> {
    status: StatusType;
    variant?: 'filled' | 'light' | 'outline' | 'dot';
}

const statusConfig: Record<StatusType, { color: string; label?: string }> = {
    active: { color: 'green', label: 'Active' },
    inactive: { color: 'gray', label: 'Inactive' },
    connected: { color: 'green', label: 'Connected' },
    disconnected: { color: 'red', label: 'Disconnected' },
    healthy: { color: 'green', label: 'Healthy' },
    unhealthy: { color: 'red', label: 'Unhealthy' },
    running: { color: 'blue', label: 'Running' },
    stopped: { color: 'gray', label: 'Stopped' },
    pending: { color: 'yellow', label: 'Pending' },
    error: { color: 'red', label: 'Error' },
    success: { color: 'green', label: 'Success' },
    warning: { color: 'orange', label: 'Warning' },
    fresh: { color: 'green', label: 'Fresh' },
    stale: { color: 'orange', label: 'Stale' }
};

export default function StatusBadge({
    status,
    variant = 'light',
    children,
    ...props
}: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <Badge
            color={config.color}
            variant={variant}
            size="sm"
            {...props}
        >
            {children || config.label || status}
        </Badge>
    );
} 