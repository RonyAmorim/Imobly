import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@presentation/navigation/types';
import { RegisterForm } from '@presentation/components/auth';
import { useAuthContext } from '@presentation/contexts/Auth';
import { UserRole } from '@domain/entities/User';
import { styles } from './styles';

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { register, isLoading, error } = useAuthContext();

  const handleRegister = useCallback(
    async (data: { name: string; email: string; password: string; role: UserRole }) => {
      await register(data);
    },
    [register]
  );

  const handleNavigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          Criar Conta
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Comece sua jornada conosco
        </Text>
      </View>

      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} initialError={error ?? undefined} />

      <View style={styles.footer}>
        <Text variant="bodyMedium" style={styles.footerText}>
          Já tem conta?{' '}
        </Text>
        <TouchableOpacity onPress={handleNavigateToLogin} disabled={isLoading}>
          <Text style={[styles.link, isLoading && styles.linkDisabled]}>
            Fazer login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};