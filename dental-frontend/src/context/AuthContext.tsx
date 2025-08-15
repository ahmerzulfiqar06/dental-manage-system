import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AppUser, UserRole } from '../types';
import { authApi, getCurrentUser, handleApiError } from '../services/api';

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user from localStorage and validate with backend
    const initializeAuth = async () => {
      try {
        const storedUser = getCurrentUser();
        if (storedUser) {
          // Validate token with backend
          const profile = await authApi.getProfile();
          setUser(profile);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Token invalid, clear stored data
        authApi.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const authResponse = await authApi.login(email, password);
      setUser(authResponse.user);
      return true;
    } catch (error) {
      console.error('Login error:', handleApiError(error));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      setLoading(true);
      const authResponse = await authApi.register({ name, email, password, role });
      setUser(authResponse.user);
      return true;
    } catch (error) {
      console.error('Registration error:', handleApiError(error));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(() => ({ user, loading, login, logout, register }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


