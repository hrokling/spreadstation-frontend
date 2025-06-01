import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Text, Button, Loader, Avatar, Menu } from '@mantine/core';
import { IconLogout, IconUser, IconSettings, IconChevronDown } from '@tabler/icons-react';
import { useAuth } from '../../hooks/useAuth';

const AppHeader: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, isLogoutPending } = useAuth();

    const handleLogout = async (): Promise<void> => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            // Error is already handled in the useAuth hook
            // The user will be logged out locally even if the API call fails
            console.error('Logout error:', error);
            navigate('/login');
        }
    };

    const handleSettings = (): void => {
        navigate('/settings');
    };

    const handleProfile = (): void => {
        navigate('/profile');
    };

    return (
        <div className="flex items-center justify-between w-full">
            {/* Left side - App title */}
            <div className="flex items-center">
                <Text size="lg" fw={600} className="text-gray-800">
                    SpreadStation Admin
                </Text>
            </div>

            {/* Right side - User menu */}
            <div className="flex items-center gap-3">
                {isAuthenticated ? (
                    <Menu shadow="md" width={200} position="bottom-end">
                        <Menu.Target>
                            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200">
                                <Avatar size="sm" radius="xl" color="blue">
                                    {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                                </Avatar>
                                <div className="text-left">
                                    <Text size="sm" fw={500} className="text-gray-700">
                                        {user?.full_name || 'User'}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {user?.email || 'user@example.com'}
                                    </Text>
                                </div>
                                <IconChevronDown size={16} className="text-gray-500" />
                            </button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Account</Menu.Label>
                            <Menu.Item
                                leftSection={<IconUser size={16} />}
                                onClick={handleProfile}
                            >
                                Profile
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconSettings size={16} />}
                                onClick={handleSettings}
                            >
                                Settings
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Item
                                leftSection={isLogoutPending ? <Loader size={16} /> : <IconLogout size={16} />}
                                onClick={handleLogout}
                                disabled={isLogoutPending}
                                color="red"
                            >
                                {isLogoutPending ? 'Logging out...' : 'Logout'}
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                ) : (
                    <Button
                        variant="filled"
                        size="sm"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AppHeader; 