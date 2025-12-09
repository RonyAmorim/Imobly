import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionText?: string;
  onActionPress?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onActionPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconPlaceholder} />
      <Text variant="headlineSmall" style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
      )}
      {actionText && onActionPress && (
        <Text style={styles.actionText} onPress={onActionPress}>
          {actionText}
        </Text>
      )}
    </View>
  );
};