import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Stack, Text, Group, Box } from '@mantine/core';
import {
    IconHome,
    IconChartLine,
    IconDatabase,
    IconSettings,
    IconUsers,
    IconFileAnalytics,
    IconTestPipe
} from '@tabler/icons-react';

interface NavItem {
    label: string;
    icon: React.ReactNode;
    href: string;
    description?: string;
}

const navItems: NavItem[] = [
    {
        label: 'Home',
        icon: <IconHome size={20} />,
        href: '/admin',
        description: 'Dashboard overview'
    },
    {
        label: 'Instruments',
        icon: <IconChartLine size={20} />,
        href: '/admin/instruments',
        description: 'Financial instruments'
    },
    {
        label: 'Data Ingestion',
        icon: <IconDatabase size={20} />,
        href: '/admin/data-ingestion',
        description: 'Data management'
    },
    {
        label: 'Analytics',
        icon: <IconFileAnalytics size={20} />,
        href: '/admin/analytics',
        description: 'Reports and analytics'
    },
    {
        label: 'Users',
        icon: <IconUsers size={20} />,
        href: '/admin/users',
        description: 'User management'
    },
    {
        label: 'Settings',
        icon: <IconSettings size={20} />,
        href: '/admin/settings',
        description: 'System configuration'
    },
    {
        label: 'Test',
        icon: <IconTestPipe size={20} />,
        href: '/admin/test',
        description: 'Component testing'
    }
];

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <Stack gap="xs" p="md">
            <Text fw={600} size="sm" c="dimmed" tt="uppercase" mb="md">
                Navigation
            </Text>

            {navItems.map((item) => {
                // Special handling for Home route - only active when exactly on /admin
                const isActive = item.href === '/admin'
                    ? location.pathname === '/admin'
                    : location.pathname === item.href;

                return (
                    <Box key={item.href} pos="relative">
                        {/* Active indicator - left border */}
                        {isActive && (
                            <Box
                                pos="absolute"
                                left={-16}
                                top={0}
                                bottom={0}
                                w={3}
                                bg="blue.6"
                                style={{ borderRadius: '0 2px 2px 0' }}
                            />
                        )}

                        <NavLink
                            to={item.href}
                            style={() => ({
                                textDecoration: 'none',
                                color: 'inherit',
                                display: 'block',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                backgroundColor: isActive ? 'var(--mantine-color-blue-0)' : 'transparent',
                                border: isActive ? '1px solid var(--mantine-color-blue-2)' : '1px solid transparent',
                                transition: 'all 0.2s ease',
                            })}
                        >
                            <Group gap="sm" wrap="nowrap">
                                <Box
                                    c={isActive ? 'blue.6' : 'gray.6'}
                                    style={{ transition: 'color 0.2s ease' }}
                                >
                                    {item.icon}
                                </Box>
                                <Stack gap={2} style={{ flex: 1 }}>
                                    <Text
                                        fw={isActive ? 600 : 500}
                                        size="sm"
                                        c={isActive ? 'blue.7' : 'gray.8'}
                                        style={{ transition: 'all 0.2s ease' }}
                                    >
                                        {item.label}
                                    </Text>
                                    {item.description && (
                                        <Text
                                            size="xs"
                                            c={isActive ? 'blue.5' : 'gray.5'}
                                            style={{ transition: 'color 0.2s ease' }}
                                        >
                                            {item.description}
                                        </Text>
                                    )}
                                </Stack>
                            </Group>
                        </NavLink>
                    </Box>
                );
            })}
        </Stack>
    );
};

export default Sidebar; 