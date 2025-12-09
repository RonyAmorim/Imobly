import { MD3LightTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { colors } from './colors';

export const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryLight,
    secondary: colors.secondary,
    secondaryContainer: colors.secondaryLight,
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.surfaceVariant,
    error: colors.error,
    errorContainer: '#FADBD8',
    onPrimary: colors.textOnPrimary,
    onSecondary: colors.textOnPrimary,
    onBackground: colors.textPrimary,
    onSurface: colors.textPrimary,
    onSurfaceVariant: colors.textSecondary,
    outline: colors.border,
    outlineVariant: colors.divider,
    scrim: colors.scrim,
  },
  roundness: 8,
};
