import { useState } from 'react';
import { Container, Title, Stack } from '@mantine/core';
import { DataTable, StatusBadge, StatCard } from './';
import type { DataTableColumn } from './';

// Mock data for demonstration
interface DataFeedItem {
    id: string;
    symbol: string;
    exchange: string;
    status: 'active' | 'inactive' | 'error';
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
        status: 'active',
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
    }
];

export default function DataTableExample() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
        view: (item: DataFeedItem) => console.log('View:', item),
        edit: (item: DataFeedItem) => console.log('Edit:', item),
        delete: (item: DataFeedItem) => console.log('Delete:', item)
    };

    return (
        <Container size="xl" py="md">
            <Stack gap="lg">
                <Title order={2}>Data Table Example</Title>

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
            </Stack>
        </Container>
    );
} 