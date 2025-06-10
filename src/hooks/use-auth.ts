"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "./use-api";

interface User {
  id: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const api = useApi();

  // Verifica se o usuário está autenticado
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await api.get<User>("/auth/me");
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  // Login
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await api.post<User>("/auth/login", credentials);
        setUser(response);
        setIsAuthenticated(true);
        return response;
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        throw error;
      }
    },
    [api],
  );

  // Logout
  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [api]);

  const refreshUser = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [api]);

  // Verifica auth na inicialização
  useEffect(() => {
    checkAuth();
  }, []);

  // Escuta eventos de logout automático
  useEffect(() => {
    const handleAuthLogout = () => {
      setUser(null);
      setIsAuthenticated(false);
    };

    window.addEventListener("auth:logout", handleAuthLogout);

    return () => {
      window.removeEventListener("auth:logout", handleAuthLogout);
    };
  }, []);

  return {
    user,
    isLoading,
    setIsLoading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    refreshUser,
  };
}
