import { StyleSheet } from 'react-native';
import { colors } from '@shared/theme/colors';
import { spacing } from '@shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  footerText: {
    color: colors.textSecondary,
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  linkDisabled: {
    opacity: 0.5,
  },
});
