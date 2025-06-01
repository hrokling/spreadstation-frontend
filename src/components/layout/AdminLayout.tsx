import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import ErrorBoundary from './ErrorBoundary';

const AdminLayout: React.FC = () => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{
                width: { sm: 200, lg: 250 },
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <div className="flex items-center h-full px-4">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                        className="mr-4"
                    />
                    <AppHeader />
                </div>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Sidebar />
            </AppShell.Navbar>

            <AppShell.Main>
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </AppShell.Main>
        </AppShell>
    );
};

export default AdminLayout; 