'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { checkAuth } from '@src/utils/auth-helper';
import { useRouter } from 'next/navigation';
import { useStore } from '@src/store/useStore';

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
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const router = useRouter();

  const verifyToken = async () => {
    try {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push('/login');
      }
      setIsLoadingAuth(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void verifyToken();
    // eslint-disable react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoadingAuth, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
