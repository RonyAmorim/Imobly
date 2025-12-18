import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';

interface ErrorMessageProps {
  message: string | null | undefined;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {onDismiss && (
        <Text style={styles.dismissText} onPress={onDismiss}>
          ✕
        </Text>
      )}
    </View>
  );
};