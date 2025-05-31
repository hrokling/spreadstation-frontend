import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Group, Text, Loader } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useAuth } from '../hooks/useAuth';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLogoutPending } = useAuth();

  const handleLogout = async () => {
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

  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-200 bg-white shadow-sm">
      {/* Left side - Logo and main navigation */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
          SpreadStation
        </Link>

        <div className="flex gap-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/instruments"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Instruments
              </Link>
              <Link
                to="/data-ingestion"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Data Ingestion
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Right side - User menu */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <Group gap="sm">
            {/* User info */}
            <Group gap="xs">
              <IconUser size={16} className="text-gray-500" />
              <Text size="sm" className="text-gray-700" fw={500}>
                {user?.full_name || 'User'}
              </Text>
            </Group>

            {/* Logout button */}
            <Button
              variant="light"
              color="red"
              size="sm"
              leftSection={isLogoutPending ? <Loader size={16} /> : <IconLogout size={16} />}
              onClick={handleLogout}
              disabled={isLogoutPending}
            >
              {isLogoutPending ? 'Logging out...' : 'Logout'}
            </Button>
          </Group>
        ) : (
          <Link to="/login">
            <Button variant="filled" size="sm">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
