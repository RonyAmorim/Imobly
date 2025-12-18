import { StyleSheet } from 'react-native';
import { colors } from '@shared/theme/colors';

export const styles = StyleSheet.create({
  wrapper: {
    // top is handled via style prop with insets
    bottom: 'auto',
    position: 'absolute',
    width: '100%',
    zIndex: 9999,
  },
  snackbar: {
    margin: 16,
    borderRadius: 8,
  },
  error: {
    backgroundColor: colors.error,
  },
  success: {
    backgroundColor: colors.primary,
  },
});
