import { useState } from 'react';
import {
    Container,
    Title,
    Stack,
    Grid,
    Button,
    Group,
    Paper,
    Text
} from '@mantine/core';
import {
    DataTable,
    StatusBadge,
    StatCard,
    ConfirmationDialog,
    ErrorDisplay
} from '../components/common';
import type { DataTableColumn } from '../components/common';
import {
    IconDatabase,
    IconTrendingUp,
    IconActivity
} from '@tabler/icons-react';

// Mock data for demonstration
interface DataFeedItem {
    id: string;
    symbol: string;
    exchange: string;
    status: 'active' | 'inactive' | 'error' | 'fresh' | 'stale';
    lastUpdate: string;
    recordCount: number;
    dataQuality: number;
}

const mockData: DataFeedItem[] = [
    {
        id: '1',
        symbol: 'AAPL',
        exchange: 'NASDAQ',
        status: 'active',
        lastUpdate: '2024-01-15 09:30:00',
        recordCount: 1250000,
        dataQuality: 98.5
    },
    {
        id: '2',
        symbol: 'GOOGL',
        exchange: 'NASDAQ',
        status: 'fresh',
        lastUpdate: '2024-01-15 09:29:45',
        recordCount: 890000,
        dataQuality: 99.2
    },
    {
        id: '3',
        symbol: 'TSLA',
        exchange: 'NASDAQ',
        status: 'error',
        lastUpdate: '2024-01-15 08:45:12',
        recordCount: 0,
        dataQuality: 0
    },
    {
        id: '4',
        symbol: 'MSFT',
        exchange: 'NASDAQ',
        status: 'inactive',
        lastUpdate: '2024-01-14 16:00:00',
        recordCount: 750000,
        dataQuality: 97.8
    },
    {
        id: '5',
        symbol: 'AMZN',
        exchange: 'NASDAQ',
        status: 'stale',
        lastUpdate: '2024-01-14 15:30:00',
        recordCount: 650000,
        dataQuality: 95.3
    }
];

export default function TestPage() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showError, setShowError] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DataFeedItem | null>(null);

    const pageSize = 10;

    // Filter data based on search
    const filteredData = mockData.filter(item =>
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.exchange.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns: DataTableColumn<DataFeedItem>[] = [
        {
            key: 'symbol',
            title: 'Symbol',
            width: 100
        },
        {
            key: 'exchange',
            title: 'Exchange',
            width: 120
        },
        {
            key: 'status',
            title: 'Status',
            width: 100,
            render: (item) => <StatusBadge status={item.status} />
        },
        {
            key: 'lastUpdate',
            title: 'Last Update',
            width: 180
        },
        {
            key: 'recordCount',
            title: 'Records',
            width: 120,
            render: (item) => item.recordCount.toLocaleString()
        },
        {
            key: 'dataQuality',
            title: 'Quality %',
            width: 100,
            render: (item) => `${item.dataQuality}%`
        }
    ];

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(1); // Reset to first page when searching
    };

    const handleRowClick = (item: DataFeedItem) => {
        console.log('Row clicked:', item);
    };

    const actions = {
        view: (item: DataFeedItem) => {
            console.log('View clicked:', item);
        },
        edit: (item: DataFeedItem) => {
            console.log('Edit clicked:', item);
        },
        delete: (item: DataFeedItem) => {
            console.log('Delete clicked:', item);
            setSelectedItem(item);
            setShowConfirmDialog(true);
            console.log('Dialog should be showing now, showConfirmDialog:', true);
        }
    };

    const toggleLoading = () => {
        setIsLoading(!isLoading);
    };

    const handleRetry = () => {
        console.log('Retrying...');
        setShowError(false);
    };

    const handleConfirmDelete = () => {
        if (selectedItem) {
            console.log('Delete confirmed for:', selectedItem);
            setShowConfirmDialog(false);
            setSelectedItem(null);
        }
    };

    const handleCancelDelete = () => {
        console.log('Delete cancelled');
        setShowConfirmDialog(false);
        setSelectedItem(null);
    };

    const testDialog = () => {
        console.log('Testing dialog manually');
        setSelectedItem(mockData[0]);
        setShowConfirmDialog(true);
    };

    return (
        <Container size="xl" py="md">
            <Stack gap="xl">
                <Title order={1}>DataTable Components Test</Title>

                {/* StatCards Demo */}
                <Stack gap="md">
                    <Title order={2}>StatCard Components</Title>
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <StatCard
                                title="Total Instruments"
                                value="1,247"
                                description="Active data feeds"
                                icon={<IconDatabase size={20} />}
                                trend={{
                                    type: 'up',
                                    value: '+12%',
                                    label: 'vs last month'
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <StatCard
                                title="Data Quality"
                                value="98.2%"
                                description="Average quality score"
                                icon={<IconActivity size={20} />}
                                trend={{
                                    type: 'up',
                                    value: '+0.5%',
                                    label: 'vs yesterday'
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <StatCard
                                title="Records Processed"
                                value="2.4M"
                                description="Today's volume"
                                icon={<IconTrendingUp size={20} />}
                                trend={{
                                    type: 'down',
                                    value: '-5%',
                                    label: 'vs yesterday'
                                }}
                            />
                        </Grid.Col>
                    </Grid>
                </Stack>

                {/* DataTable Demo */}
                <Stack gap="md">
                    <Group justify="space-between" align="center">
                        <Title order={2}>DataTable Component</Title>
                        <Group>
                            <Button
                                variant="outline"
                                onClick={toggleLoading}
                                size="sm"
                            >
                                {isLoading ? 'Stop Loading' : 'Test Loading'}
                            </Button>
                            <Button
                                variant="outline"
                                color="red"
                                onClick={() => setShowError(!showError)}
                                size="sm"
                            >
                                {showError ? 'Hide Error' : 'Show Error'}
                            </Button>
                            <Button
                                variant="outline"
                                color="purple"
                                onClick={testDialog}
                                size="sm"
                            >
                                Test Dialog
                            </Button>
                        </Group>
                    </Group>

                    <Text size="sm" c="dimmed">
                        Debug: showConfirmDialog = {showConfirmDialog.toString()}, selectedItem = {selectedItem?.symbol || 'null'}
                    </Text>

                    {showError && (
                        <ErrorDisplay
                            title="Data Feed Error"
                            message="Failed to fetch instrument data from the API. Please check your connection and try again."
                            onRetry={handleRetry}
                            severity="error"
                        />
                    )}

                    <Paper withBorder p="md">
                        <DataTable
                            data={filteredData}
                            columns={columns}
                            totalItems={filteredData.length}
                            page={page}
                            onPageChange={setPage}
                            pageSize={pageSize}
                            isLoading={isLoading}
                            onRowClick={handleRowClick}
                            onSearch={handleSearch}
                            actions={actions}
                            searchPlaceholder="Search symbols or exchanges..."
                            emptyMessage="No data feeds found"
                        />
                    </Paper>
                </Stack>

                {/* Status Badges Demo */}
                <Stack gap="md">
                    <Title order={2}>StatusBadge Components</Title>
                    <Paper withBorder p="md">
                        <Stack gap="sm">
                            <Text size="sm" c="dimmed">Data Feed Statuses:</Text>
                            <Group>
                                <StatusBadge status="active" />
                                <StatusBadge status="inactive" />
                                <StatusBadge status="error" />
                                <StatusBadge status="fresh" />
                                <StatusBadge status="stale" />
                            </Group>

                            <Text size="sm" c="dimmed" mt="md">Connection Statuses:</Text>
                            <Group>
                                <StatusBadge status="connected" />
                                <StatusBadge status="disconnected" />
                                <StatusBadge status="healthy" />
                                <StatusBadge status="unhealthy" />
                            </Group>

                            <Text size="sm" c="dimmed" mt="md">Process Statuses:</Text>
                            <Group>
                                <StatusBadge status="running" />
                                <StatusBadge status="stopped" />
                                <StatusBadge status="pending" />
                                <StatusBadge status="success" />
                                <StatusBadge status="warning" />
                            </Group>
                        </Stack>
                    </Paper>
                </Stack>

                {/* Instructions */}
                <Paper withBorder p="md" bg="blue.0">
                    <Stack gap="sm">
                        <Title order={3}>Test Instructions</Title>
                        <Text size="sm">
                            • Try searching for symbols (AAPL, GOOGL, etc.) or exchanges (NASDAQ)
                        </Text>
                        <Text size="sm">
                            • Click on table rows to see console output
                        </Text>
                        <Text size="sm">
                            • Use the action buttons (view, edit, delete) to test interactions
                        </Text>
                        <Text size="sm">
                            • Toggle loading state to see skeleton loaders
                        </Text>
                        <Text size="sm">
                            • Show error to test error display component
                        </Text>
                        <Text size="sm">
                            • Check browser console for click events and action outputs
                        </Text>
                        <Text size="sm" fw={600}>
                            • Use "Test Dialog" button to manually test the confirmation dialog
                        </Text>
                    </Stack>
                </Paper>
            </Stack>

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                opened={showConfirmDialog}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Delete Instrument"
                message={
                    selectedItem
                        ? `Are you sure you want to delete ${selectedItem.symbol} (${selectedItem.exchange})? This action cannot be undone.`
                        : "Are you sure you want to delete this instrument? This action cannot be undone."
                }
                confirmLabel="Delete"
                danger
            />
        </Container>
    );
} 