import React from 'react';
import { Container, Title, Text, Button, Group, Stack, Table, Badge, ActionIcon } from '@mantine/core';
import { IconUsers, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';

const UsersPage: React.FC = () => {
    // Mock user data
    const users = [
        { id: 1, name: 'System Administrator', email: 'admin@spreadstation.com', role: 'admin', status: 'active' },
        { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active' },
        { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'inactive' },
    ];

    return (
        <Container size="xl">
            <Stack gap="lg">
                <Group justify="space-between" align="center">
                    <div>
                        <Title order={1}>Users</Title>
                        <Text c="dimmed" size="lg">
                            Manage user accounts and permissions
                        </Text>
                    </div>
                    <Button leftSection={<IconPlus size={16} />}>
                        Add User
                    </Button>
                </Group>

                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Role</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {users.map((user) => (
                            <Table.Tr key={user.id}>
                                <Table.Td>{user.name}</Table.Td>
                                <Table.Td>{user.email}</Table.Td>
                                <Table.Td>
                                    <Badge color={user.role === 'admin' ? 'red' : 'blue'} variant="light">
                                        {user.role}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Badge color={user.status === 'active' ? 'green' : 'gray'} variant="light">
                                        {user.status}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <ActionIcon variant="subtle" color="blue">
                                            <IconEdit size={16} />
                                        </ActionIcon>
                                        <ActionIcon variant="subtle" color="red">
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Stack>
        </Container>
    );
};

export default UsersPage; 