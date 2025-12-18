import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '@shared/theme/colors';
import { User } from '@domain/entities/User';
import { AsyncStorageDataSource } from '@data/datasources/local/AsyncStorageDataSource';
import { AuthLocalDataSource } from '@data/datasources/local/AuthLocalDataSource';
import { AuthRepository } from '@data/repositories/AuthRepository';
import { LoginUseCase } from '@domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '@domain/usecases/auth/RegisterUseCase';
import { LogoutUseCase } from '@domain/usecases/auth/LogoutUseCase';
import { GetCurrentUserUseCase } from '@domain/usecases/auth/GetCurrentUserUseCase';
import { useAuth } from '../../hooks/useAuth';
import { RegisterDTO } from '@domain/repositories/IAuthRepository';
import { styles } from './styles';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterDTO) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const asyncStorage = new AsyncStorageDataSource();
const authDataSource = new AuthLocalDataSource(asyncStorage);
const authRepository = new AuthRepository(authDataSource);
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authHook = useAuth(loginUseCase, registerUseCase, logoutUseCase, getCurrentUserUseCase);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const value = React.useMemo<AuthContextData>(() => ({
    user: authHook.user,
    isAuthenticated: authHook.user !== null,
    isLoading: authHook.isLoading,
    error: authHook.error,
    login: authHook.login,
    register: authHook.register,
    logout: authHook.logout,
    getCurrentUser: authHook.getCurrentUser,
    clearError: authHook.clearError,
  }), [
    authHook.user,
    authHook.isLoading,
    authHook.error,
    authHook.login,
    authHook.register,
    authHook.logout,
    authHook.getCurrentUser,
    authHook.clearError
  ]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await authHook.getCurrentUser();
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [authHook.getCurrentUser]);

  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};