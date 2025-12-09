import { StyleSheet } from 'react-native';
import { colors } from '@shared/theme/colors';
import { spacing } from '@shared/theme/spacing';

export const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  image: {
    height: 180,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: spacing.md,
  },
  name: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  address: {
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  location: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  infoRow: {
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.md,
  },
  price: {
    color: colors.primary,
    fontWeight: 'bold',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    padding: spacing.xs,
  },
});
