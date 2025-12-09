import { StyleSheet } from 'react-native';
import { colors } from '@shared/theme/colors';
import { spacing } from '@shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appbarTitle: {
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl * 2, // Extra padding for floating button
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: 'transparent',
  },
});
