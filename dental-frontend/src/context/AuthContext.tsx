import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AppUser, UserRole } from '../types';
import { getUser, saveUser, getUsers, registerUser } from '../services/storage';

interface AuthContextValue {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// For demo: store passwords in memory map (NOT production). Replace with backend later.
const PASSWORDS_KEY = 'dc_passwords';
const getPasswords = (): Record<string, string> => JSON.parse(localStorage.getItem(PASSWORDS_KEY) || '{}');
const setPasswords = (m: Record<string, string>) => localStorage.setItem(PASSWORDS_KEY, JSON.stringify(m));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const login = async (email: string, password: string) => {
    const map = getPasswords();
    const ok = map[email] && map[email] === password;
    if (!ok) return false;
    const found = getUsers().find((u) => u.email === email) || null;
    setUser(found);
    saveUser(found || null);
    return !!found;
  };

  const logout = () => {
    setUser(null);
    saveUser(null);
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    const users = getUsers();
    if (users.some((u) => u.email === email)) return false;
    const newUser: AppUser = { id: crypto.randomUUID(), name, email, role };
    registerUser(newUser);
    const map = getPasswords();
    map[email] = password;
    setPasswords(map);
    setUser(newUser);
    saveUser(newUser);
    return true;
  };

  const value = useMemo(() => ({ user, login, logout, register }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


