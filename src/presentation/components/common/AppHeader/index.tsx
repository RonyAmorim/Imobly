import React from 'react';
import { Appbar } from 'react-native-paper';
import { styles } from './styles';
import { colors } from '@shared/theme/colors';

interface AppHeaderProps {
  title: string;
  onBack?: () => void;
  children?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title, onBack, children }) => {
  return (
    <Appbar.Header style={styles.header}>
      {onBack && <Appbar.BackAction onPress={onBack} color={colors.textOnPrimary} />}
      <Appbar.Content title={title} titleStyle={styles.title} color={colors.textOnPrimary} />
      {children}
    </Appbar.Header>
  );
};
