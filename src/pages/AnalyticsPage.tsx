import React from 'react';
import { Container, Title, Text, Grid, Card, Group, Stack } from '@mantine/core';
import { IconChartLine, IconTrendingUp, IconReportAnalytics } from '@tabler/icons-react';

const AnalyticsPage: React.FC = () => {
    return (
        <Container size="xl">
            <Stack gap="lg">
                <Group justify="space-between" align="center">
                    <div>
                        <Title order={1}>Analytics</Title>
                        <Text c="dimmed" size="lg">
                            Financial data analysis and reporting
                        </Text>
                    </div>
                </Group>

                <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Group justify="space-between" mb="xs">
                                <Text fw={500}>Performance Metrics</Text>
                                <IconChartLine size={20} />
                            </Group>
                            <Text size="sm" c="dimmed">
                                Track portfolio performance and key metrics
                            </Text>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Group justify="space-between" mb="xs">
                                <Text fw={500}>Trend Analysis</Text>
                                <IconTrendingUp size={20} />
                            </Group>
                            <Text size="sm" c="dimmed">
                                Analyze market trends and patterns
                            </Text>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Group justify="space-between" mb="xs">
                                <Text fw={500}>Custom Reports</Text>
                                <IconReportAnalytics size={20} />
                            </Group>
                            <Text size="sm" c="dimmed">
                                Generate detailed analytical reports
                            </Text>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    );
};

export default AnalyticsPage; 