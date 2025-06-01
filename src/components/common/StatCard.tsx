import { Card, Text, Group, Stack, ThemeIcon } from '@mantine/core';
import type { ReactNode } from 'react';
import {
    IconTrendingUp,
    IconTrendingDown,
    IconMinus
} from '@tabler/icons-react';

export type TrendType = 'up' | 'down' | 'neutral';

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: ReactNode;
    trend?: {
        type: TrendType;
        value: string | number;
        label?: string;
    };
    loading?: boolean;
}

const trendConfig: Record<TrendType, { color: string; icon: ReactNode }> = {
    up: { color: 'green', icon: <IconTrendingUp size={16} /> },
    down: { color: 'red', icon: <IconTrendingDown size={16} /> },
    neutral: { color: 'gray', icon: <IconMinus size={16} /> }
};

export default function StatCard({
    title,
    value,
    description,
    icon,
    trend,
    loading = false
}: StatCardProps) {
    return (
        <Card withBorder padding="md" radius="md">
            <Stack gap="xs">
                <Group justify="space-between" align="flex-start">
                    <Text size="sm" c="dimmed" fw={500}>
                        {title}
                    </Text>
                    {icon && (
                        <ThemeIcon variant="light" size="sm">
                            {icon}
                        </ThemeIcon>
                    )}
                </Group>

                <Text size="xl" fw={700} lh={1}>
                    {loading ? '...' : value}
                </Text>

                {(description || trend) && (
                    <Group justify="space-between" align="center">
                        {description && (
                            <Text size="xs" c="dimmed">
                                {description}
                            </Text>
                        )}

                        {trend && (
                            <Group gap={4} align="center">
                                <ThemeIcon
                                    variant="light"
                                    color={trendConfig[trend.type].color}
                                    size="xs"
                                >
                                    {trendConfig[trend.type].icon}
                                </ThemeIcon>
                                <Text
                                    size="xs"
                                    c={trendConfig[trend.type].color}
                                    fw={500}
                                >
                                    {trend.value}
                                    {trend.label && ` ${trend.label}`}
                                </Text>
                            </Group>
                        )}
                    </Group>
                )}
            </Stack>
        </Card>
    );
} 