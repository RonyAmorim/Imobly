import { StyleSheet } from 'react-native';
import { colors } from '@shared/theme/colors';
import { spacing } from '@shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  submitButton: {
    marginVertical: spacing.lg,
    marginBottom: spacing.xl,
  },
});
