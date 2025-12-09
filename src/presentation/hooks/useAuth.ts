import { useState, useCallback } from 'react';
import { User } from '@domain/entities/User';
import { LoginUseCase } from '@domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '@domain/usecases/auth/RegisterUseCase';
import { LogoutUseCase } from '@domain/usecases/auth/LogoutUseCase';
import { GetCurrentUserUseCase } from '@domain/usecases/auth/GetCurrentUserUseCase';
import { RegisterDTO } from '@domain/repositories/IAuthRepository';

export const useAuth = (
  loginUseCase: LoginUseCase,
  registerUseCase: RegisterUseCase,
  logoutUseCase: LogoutUseCase,
  getCurrentUserUseCase: GetCurrentUserUseCase,
) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const loggedUser = await loginUseCase.execute({ email, password });
        setUser(loggedUser);
      } catch (err: unknown) {
        console.error('[useAuth] Login erro:', err);
        const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [loginUseCase],
  );

  const register = useCallback(
    async (data: RegisterDTO) => {
      try {
        setIsLoading(true);
        setError(null);
        const newUser = await registerUseCase.execute(data);
        setUser(newUser);
      } catch (err: unknown) {
        console.error('[useAuth] Register erro:', err);
        const errorMessage = err instanceof Error ? err.message : 'Erro ao criar conta';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [registerUseCase],
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await logoutUseCase.execute();
      setUser(null);
      setError(null);
    } catch (err: unknown) {
      console.error('Error logging out:', err);
    } finally {
      setIsLoading(false);
    }
  }, [logoutUseCase]);

  const getCurrentUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUserUseCase.execute();
      setUser(currentUser);
      return currentUser;
    } catch (err: unknown) {
      console.error('Error getting current user:', err);
      return null;
    }
  }, [getCurrentUserUseCase]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    getCurrentUser,
    clearError,
  };
};
