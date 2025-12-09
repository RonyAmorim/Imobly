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
  profileCard: {
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.surface,
    fontWeight: 'bold',
  },
  name: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  role: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: 14,
  },
  infoCard: {
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  infoRow: {
    marginVertical: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
  },
  value: {
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  divider: {
    marginVertical: spacing.md,
  },
  footer: {
    paddingBottom: spacing.xl,
  },
  logoutButton: {
    borderColor: colors.error,
  },
});
