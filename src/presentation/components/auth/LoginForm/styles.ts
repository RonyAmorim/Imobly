import { StyleSheet } from 'react-native';
import { colors } from '@shared/theme/colors';
import { spacing } from '@shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  submitButton: {
    marginVertical: spacing.lg,
  },
  helperText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
