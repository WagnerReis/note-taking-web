export type ToastType = "success" | "error";

export interface Toast {
  id: string;
  type: ToastType;
  message?: string;
  link?: string;
  duration?: number;
  createdAt: Date;
  linkAction?: () => void;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id" | "createdAt">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}
