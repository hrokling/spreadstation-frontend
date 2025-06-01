import React from 'react';
import { Skeleton, Stack, Group, Container } from '@mantine/core';

interface LoadingSkeletonProps {
    variant?: 'page' | 'card' | 'table' | 'form';
    lines?: number;
    height?: number | string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
    variant = 'page',
    lines = 3,
    height = 20
}) => {
    const renderPageSkeleton = (): React.ReactNode => (
        <Container size="lg">
            <Stack gap="lg">
                {/* Header skeleton */}
                <Group justify="space-between" align="center">
                    <Skeleton height={32} width="30%" />
                    <Skeleton height={36} width={120} />
                </Group>

                {/* Content skeleton */}
                <Stack gap="md">
                    {Array.from({ length: lines }).map((_, index) => (
                        <Skeleton key={index} height={height} width={`${90 - index * 5}%`} />
                    ))}
                </Stack>

                {/* Additional content blocks */}
                <Group gap="md">
                    <Skeleton height={100} width="48%" />
                    <Skeleton height={100} width="48%" />
                </Group>
            </Stack>
        </Container>
    );

    const renderCardSkeleton = (): React.ReactNode => (
        <Stack gap="sm">
            <Skeleton height={24} width="70%" />
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton key={index} height={height} width={`${85 - index * 10}%`} />
            ))}
        </Stack>
    );

    const renderTableSkeleton = (): React.ReactNode => (
        <Stack gap="xs">
            {/* Table header */}
            <Group gap="md">
                <Skeleton height={20} width="20%" />
                <Skeleton height={20} width="25%" />
                <Skeleton height={20} width="15%" />
                <Skeleton height={20} width="20%" />
                <Skeleton height={20} width="10%" />
            </Group>

            {/* Table rows */}
            {Array.from({ length: lines }).map((_, index) => (
                <Group key={index} gap="md">
                    <Skeleton height={16} width="20%" />
                    <Skeleton height={16} width="25%" />
                    <Skeleton height={16} width="15%" />
                    <Skeleton height={16} width="20%" />
                    <Skeleton height={16} width="10%" />
                </Group>
            ))}
        </Stack>
    );

    const renderFormSkeleton = (): React.ReactNode => (
        <Stack gap="md">
            {Array.from({ length: lines }).map((_, index) => (
                <Stack key={index} gap="xs">
                    <Skeleton height={16} width="20%" />
                    <Skeleton height={36} width="100%" />
                </Stack>
            ))}

            <Group gap="sm" mt="lg">
                <Skeleton height={36} width={100} />
                <Skeleton height={36} width={80} />
            </Group>
        </Stack>
    );

    const skeletonVariants = {
        page: renderPageSkeleton,
        card: renderCardSkeleton,
        table: renderTableSkeleton,
        form: renderFormSkeleton,
    };

    return (
        <div className="animate-pulse">
            {skeletonVariants[variant]()}
        </div>
    );
};

export default LoadingSkeleton; 