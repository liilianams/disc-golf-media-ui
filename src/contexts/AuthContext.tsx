'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { checkAuth } from '@src/utils/auth-helper';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  verifyToken: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext is undefined');
  }
  return context;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const router = useRouter();

  const verifyToken = async () => {
    console.log('Verifying token');
    try {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/login')
      }
      setIsLoadingAuth(false);
      console.log('Auth isAuthenticated: ', isAuthenticated);
      console.log('Auth isLoadingAuth: ', isLoadingAuth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoadingAuth, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
