/**
 * useAuth Hook
 * Constitution II: View & Logic Separation - Feature-specific Hook
 */
import { useState } from 'react';
import type { LoginCredentials, User, AuthState } from '../types/auth.types';

interface UseAuthReturn {
  authState: AuthState;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
}

function useAuth(): UseAuthReturn {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = (credentials: LoginCredentials): void => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // TODO: API 호출 구현
      // Example: const response = await authApi.login(credentials);

      // Mock response for demonstration
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'User Name',
        createdAt: new Date().toISOString(),
      };

      setAuthState({
        user: mockUser,
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const logout = (): void => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return {
    authState,
    login,
    logout,
  };
}

export default useAuth;
