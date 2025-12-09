import { StyleSheet } from 'react-native';
import { colors } from '@shared/theme/colors';
import { spacing } from '@shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: spacing.xxl,
  },
  logo: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontWeight: '600',
  },
  description: {
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttons: {
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  button: {
    marginBottom: spacing.md,
  },
});
