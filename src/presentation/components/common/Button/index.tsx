import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { colors } from '@shared/theme/colors';
import { styles } from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'contained',
  fullWidth = true,
  style,
}) => {
  const mode = variant === 'contained' ? 'contained' : variant === 'outlined' ? 'outlined' : 'text';

  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      buttonColor={variant === 'contained' ? colors.primary : undefined}
      textColor={variant === 'outlined' ? colors.primary : undefined}
      style={[styles.button, fullWidth && styles.fullWidth, style]}
    >
      {title}
    </PaperButton>
  );
};