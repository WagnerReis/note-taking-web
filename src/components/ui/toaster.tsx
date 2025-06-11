"use client";

import { useToast } from "@/contexts/ToastContext";
import { Toast } from "./toast";

export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="fixed right-400 bottom-1000 z-50 flex w-full max-w-sm flex-col gap-2 md:bottom-[100px] lg:bottom-600"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
