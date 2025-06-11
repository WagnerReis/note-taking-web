"use client";

import { Toast, ToastContextType } from "@/types/toast";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToastById = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const markToastAsExiting = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, exiting: true } : toast,
      ),
    );
  }, []);

  const removeToast = useCallback(
    (id: string) => {
      // Primeiro marca o toast como exiting
      markToastAsExiting(id);

      // Remove o toast após a animação
      setTimeout(() => {
        removeToastById(id);
      }, 300); // Duração da animação de saída
    },
    [markToastAsExiting, removeToastById],
  );

  const addToast = useCallback(
    (toast: Omit<Toast, "id" | "createdAt">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = {
        ...toast,
        id,
        createdAt: new Date(),
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto remove toast after duration
      if (toast.duration !== 0) {
        const duration = toast.duration ?? 5000;
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast],
  );

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      clearToasts,
    }),
    [toasts, addToast, removeToast, clearToasts],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
