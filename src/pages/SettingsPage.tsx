import React from 'react';
import { Container, Title, Text, Card, Group, Stack, Switch, Button, Divider } from '@mantine/core';
import { IconSettings, IconBell, IconShield, IconDatabase } from '@tabler/icons-react';

const SettingsPage: React.FC = () => {
    return (
        <Container size="xl">
            <Stack gap="lg">
                <Group justify="space-between" align="center">
                    <div>
                        <Title order={1}>Settings</Title>
                        <Text c="dimmed" size="lg">
                            Configure application preferences and system settings
                        </Text>
                    </div>
                </Group>

                <Stack gap="md">
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group mb="md">
                            <IconBell size={20} />
                            <Text fw={500} size="lg">Notifications</Text>
                        </Group>
                        <Stack gap="sm">
                            <Group justify="space-between">
                                <div>
                                    <Text fw={500}>Email Notifications</Text>
                                    <Text size="sm" c="dimmed">Receive email alerts for important events</Text>
                                </div>
                                <Switch defaultChecked />
                            </Group>
                            <Group justify="space-between">
                                <div>
                                    <Text fw={500}>Push Notifications</Text>
                                    <Text size="sm" c="dimmed">Get browser notifications for real-time updates</Text>
                                </div>
                                <Switch />
                            </Group>
                        </Stack>
                    </Card>

                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group mb="md">
                            <IconShield size={20} />
                            <Text fw={500} size="lg">Security</Text>
                        </Group>
                        <Stack gap="sm">
                            <Group justify="space-between">
                                <div>
                                    <Text fw={500}>Two-Factor Authentication</Text>
                                    <Text size="sm" c="dimmed">Add an extra layer of security to your account</Text>
                                </div>
                                <Button variant="outline" size="sm">Configure</Button>
                            </Group>
                            <Divider />
                            <Group justify="space-between">
                                <div>
                                    <Text fw={500}>Session Timeout</Text>
                                    <Text size="sm" c="dimmed">Automatically log out after inactivity</Text>
                                </div>
                                <Switch defaultChecked />
                            </Group>
                        </Stack>
                    </Card>

                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group mb="md">
                            <IconDatabase size={20} />
                            <Text fw={500} size="lg">Data Management</Text>
                        </Group>
                        <Stack gap="sm">
                            <Group justify="space-between">
                                <div>
                                    <Text fw={500}>Data Retention</Text>
                                    <Text size="sm" c="dimmed">Configure how long data is stored</Text>
                                </div>
                                <Button variant="outline" size="sm">Manage</Button>
                            </Group>
                            <Group justify="space-between">
                                <div>
                                    <Text fw={500}>Export Data</Text>
                                    <Text size="sm" c="dimmed">Download your data in various formats</Text>
                                </div>
                                <Button variant="outline" size="sm">Export</Button>
                            </Group>
                        </Stack>
                    </Card>
                </Stack>
            </Stack>
        </Container>
    );
};

export default SettingsPage; 