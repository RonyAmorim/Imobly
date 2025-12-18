import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { Input, Button } from '../../common';
import { validateEmail } from '@shared/utils/validators';
import { UserRole } from '@domain/entities/User';
import { useNotification } from '@presentation/contexts/Notification';
import { styles } from './styles';

interface RegisterFormProps {
  onSubmit: (data: { name: string; email: string; password: string; role: UserRole }) => Promise<void>;
  isLoading?: boolean;
  initialError?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  initialError,
}) => {
  const { showError } = useNotification();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialError) {
      showError(initialError);
    }
  }, [initialError, showError]);

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, password, confirmPassword]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({ name, email, password, role });
    } catch (error) {
      showError(error);
    }
  }, [name, email, password, role, validateForm, onSubmit, showError]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Input
        label="Nome Completo"
        placeholder="Seu nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        error={errors.name}
        editable={!isLoading}
      />

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

      <Input
        label="Confirmar Senha"
        placeholder="••••••"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        error={errors.confirmPassword}
        editable={!isLoading}
      />

      <View style={styles.roleSection}>
        <Text variant="labelLarge" style={styles.roleLabel}>
          Tipo de Conta
        </Text>
        <SegmentedButtons
          value={role}
          onValueChange={(value) => setRole(value)}
          buttons={[
            {
              value: UserRole.CLIENT,
              label: 'Cliente',
              disabled: isLoading,
            },
            {
              value: UserRole.ADMIN,
              label: 'Admin',
              disabled: isLoading,
            },
          ]}
          style={styles.segmentedButtons}
          density="medium"
        />
      </View>

      <Button
        title="Criar Conta"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
      />

      <Text style={styles.helperText}>
        Já tem conta? Faça login para continuar.
      </Text>
    </ScrollView>
  );
};