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
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  statLabel: {
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: spacing.xl,
  },
  actionsTitle: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  logoutButton: {
    borderColor: colors.error,
  },
});
