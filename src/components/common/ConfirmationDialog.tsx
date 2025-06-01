import { Modal, Text, Group, Button, Stack } from '@mantine/core';
import type { ReactNode } from 'react';

interface ConfirmationDialogProps {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string | ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmColor?: string;
    loading?: boolean;
    danger?: boolean;
}

export default function ConfirmationDialog({
    opened,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmColor,
    loading = false,
    danger = false
}: ConfirmationDialogProps) {
    const handleConfirm = () => {
        onConfirm();
    };

    const defaultConfirmColor = danger ? 'red' : 'blue';

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={title}
            centered
            size="sm"
        >
            <Stack gap="md">
                <Text size="sm">
                    {message}
                </Text>

                <Group justify="flex-end" gap="sm">
                    <Button
                        variant="subtle"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </Button>

                    <Button
                        color={confirmColor || defaultConfirmColor}
                        onClick={handleConfirm}
                        loading={loading}
                    >
                        {confirmLabel}
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
} 