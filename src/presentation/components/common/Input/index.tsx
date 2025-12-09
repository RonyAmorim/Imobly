import React from 'react';
import { View, StyleProp, TextStyle } from 'react-native';
import { TextInput as PaperInput, Text } from 'react-native-paper';
import { colors } from '@shared/theme/colors';
import { styles } from './styles';

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  disabled?: boolean;
  maxLength?: number;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  disabled = false,
  maxLength,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  style,
}) => {
  return (
    <View style={styles.container}>
      <PaperInput
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        disabled={disabled}
        maxLength={maxLength}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        mode="outlined"
        outlineColor={colors.border}
        activeOutlineColor={error ? colors.error : colors.primary}
        textColor={colors.textPrimary}
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, style]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};