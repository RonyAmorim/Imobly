import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@presentation/navigation/types';
import { LoginForm } from '@presentation/components/auth';
import { useAuthContext } from '@presentation/contexts/AuthContext';
import { styles } from './styles';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login, isLoading, error } = useAuthContext();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      await login(email, password);
    },
    [login]
  );

  const handleNavigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          Bem-vindo
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Acesse sua conta
        </Text>
      </View>

      <LoginForm onSubmit={handleLogin} isLoading={isLoading} initialError={error || undefined} />

      <View style={styles.footer}>
        <Text variant="bodyMedium" style={styles.footerText}>
          Não tem conta?{' '}
        </Text>
        <TouchableOpacity onPress={handleNavigateToRegister} disabled={isLoading}>
          <Text style={[styles.link, isLoading && styles.linkDisabled]}>
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};