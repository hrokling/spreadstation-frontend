import { useState } from 'react';
import {
    Table,
    Pagination,
    TextInput,
    Group,
    ActionIcon,
    Box,
    Text,
    Skeleton,
    Stack
} from '@mantine/core';
import {
    IconSearch,
    IconEdit,
    IconTrash,
    IconEye
} from '@tabler/icons-react';

export interface DataTableColumn<T> {
    key: keyof T | string;
    title: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    width?: string | number;
}

export interface DataTableActions<T> {
    view?: (item: T) => void;
    edit?: (item: T) => void;
    delete?: (item: T) => void;
    custom?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: DataTableColumn<T>[];
    totalItems: number;
    page: number;
    onPageChange: (page: number) => void;
    pageSize: number;
    isLoading?: boolean;
    onRowClick?: (item: T) => void;
    onSearch?: (query: string) => void;
    actions?: DataTableActions<T>;
    searchPlaceholder?: string;
    emptyMessage?: string;
    showSearch?: boolean;
}

export default function DataTable<T extends { id: string | number }>({
    data,
    columns,
    totalItems,
    page,
    onPageChange,
    pageSize,
    isLoading = false,
    onRowClick,
    onSearch,
    actions,
    searchPlaceholder = "Search...",
    emptyMessage = "No data available",
    showSearch = true
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (onSearch) onSearch(searchQuery);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const totalPages = Math.ceil(totalItems / pageSize);
    const hasActions = actions && (actions.view || actions.edit || actions.delete || actions.custom);

    const renderSkeletonRows = () => {
        return Array.from({ length: Math.min(pageSize, 5) }).map((_, index) => (
            <tr key={`skeleton-${index}`}>
                {columns.map((column, colIndex) => (
                    <td key={`skeleton-${index}-${colIndex}`}>
                        <Skeleton height={20} />
                    </td>
                ))}
                {hasActions && (
                    <td>
                        <Group gap="xs">
                            <Skeleton height={24} width={24} />
                            <Skeleton height={24} width={24} />
                        </Group>
                    </td>
                )}
            </tr>
        ));
    };

    const renderDataRows = () => {
        if (data.length === 0) {
            return (
                <tr>
                    <td colSpan={columns.length + (hasActions ? 1 : 0)}>
                        <Text ta="center" c="dimmed" py="xl">
                            {emptyMessage}
                        </Text>
                    </td>
                </tr>
            );
        }

        return data.map((item) => (
            <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                style={{
                    cursor: onRowClick ? 'pointer' : 'default'
                }}
            >
                {columns.map((column) => (
                    <td
                        key={`${item.id}-${column.key.toString()}`}
                        style={{ width: column.width }}
                    >
                        {column.render
                            ? column.render(item)
                            : String(item[column.key as keyof T] ?? '')}
                    </td>
                ))}
                {hasActions && (
                    <td>
                        <Group gap="xs">
                            {actions?.view && (
                                <ActionIcon
                                    variant="subtle"
                                    color="blue"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        actions.view!(item);
                                    }}
                                >
                                    <IconEye size={16} />
                                </ActionIcon>
                            )}
                            {actions?.edit && (
                                <ActionIcon
                                    variant="subtle"
                                    color="yellow"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        actions.edit!(item);
                                    }}
                                >
                                    <IconEdit size={16} />
                                </ActionIcon>
                            )}
                            {actions?.delete && (
                                <ActionIcon
                                    variant="subtle"
                                    color="red"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        actions.delete!(item);
                                    }}
                                >
                                    <IconTrash size={16} />
                                </ActionIcon>
                            )}
                            {actions?.custom?.(item)}
                        </Group>
                    </td>
                )}
            </tr>
        ));
    };

    return (
        <Stack gap="md">
            {showSearch && onSearch && (
                <Group justify="flex-end">
                    <TextInput
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rightSection={
                            <ActionIcon
                                variant="subtle"
                                onClick={handleSearch}
                                disabled={isLoading}
                            >
                                <IconSearch size={16} />
                            </ActionIcon>
                        }
                        style={{ maxWidth: 300 }}
                    />
                </Group>
            )}

            <Box style={{ overflowX: 'auto' }}>
                <Table
                    striped
                    highlightOnHover={!isLoading}
                    verticalSpacing="xs"
                    horizontalSpacing="sm"
                >
                    <Table.Thead>
                        <Table.Tr>
                            {columns.map((column) => (
                                <Table.Th key={column.key.toString()}>
                                    {column.title}
                                </Table.Th>
                            ))}
                            {hasActions && <Table.Th>Actions</Table.Th>}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {isLoading ? renderSkeletonRows() : renderDataRows()}
                    </Table.Tbody>
                </Table>
            </Box>

            {totalPages > 1 && (
                <Group justify="flex-end">
                    <Pagination
                        total={totalPages}
                        value={page}
                        onChange={onPageChange}
                        size="sm"
                        disabled={isLoading}
                    />
                </Group>
            )}
        </Stack>
    );
} 