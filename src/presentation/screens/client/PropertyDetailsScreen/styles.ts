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
  image: {
    width: '100%',
    height: 250,
    backgroundColor: colors.background,
  },
  section: {
    padding: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  price: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  sectionContent: {
    color: colors.textPrimary,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    color: colors.textPrimary,
    flex: 1.5,
    textAlign: 'right',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  map: {
    width: '100%',
    height: 200,
  },
});
