import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Input, Button } from '../../common';
import { validateEmail } from '@shared/utils/validators';
import { useNotification } from '@presentation/contexts/NotificationContext';
import { styles } from './styles';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
  initialError?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  initialError,
}) => {
  const { showError } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialError) {
      showError(initialError);
    }
  }, [initialError, showError]);

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(email, password);
    } catch (error) {
      showError(error);
    }
  }, [email, password, validateForm, onSubmit, showError]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Input
        label="Email"
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        editable={!isLoading}
      />

      <Input
        label="Senha"
        placeholder="••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={errors.password}
        editable={!isLoading}
      />

      <Button
        title="Entrar"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
      />

      <Text style={styles.helperText}>
        Não tem conta? Crie uma para começar.
      </Text>
    </ScrollView>
  );
};