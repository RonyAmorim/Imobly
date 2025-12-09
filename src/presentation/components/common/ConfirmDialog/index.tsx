import React from 'react';
import { Dialog, Portal, Button, Text } from 'react-native-paper';
import { colors } from '@shared/theme/colors';
import { styles } from './styles';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  isDangerous?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  isLoading = false,
  isDangerous = false,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{ color: colors.textPrimary }}>
            {description}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel} disabled={isLoading} textColor={colors.textSecondary}>
            {cancelText}
          </Button>
          <Button
            onPress={onConfirm}
            loading={isLoading}
            disabled={isLoading}
            textColor={isDangerous ? colors.error : colors.primary}
          >
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};