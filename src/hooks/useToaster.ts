import { useToast } from "@/contexts/ToastContext";
import { ToastType } from "@/types/toast";

export function useToaster() {
  const { addToast, removeToast, clearToasts } = useToast();

  const showToast = (
    type: ToastType,
    message?: string,
    duration?: number,
    link?: string,
    linkAction?: () => void,
  ) => {
    addToast({
      type,
      message,
      duration,
      link,
      linkAction,
    });
  };

  const success = (
    message?: string,
    duration?: number,
    link?: string,
    linkAction?: () => void,
  ) => {
    showToast("success", message, duration, link, linkAction);
  };

  const error = (
    message?: string,
    duration?: number,
    link?: string,
    linkAction?: () => void,
  ) => {
    showToast("error", message, duration, link, linkAction);
  };

  return {
    showToast,
    success,
    error,
    removeToast,
    clearToasts,
  };
}
