"use client";

import { cn } from "@/lib/utils";
import { Toast as ToastType } from "@/types/toast";
import { CheckCircle, CircleWavyWarning, X } from "phosphor-react";
import { Preset6 } from "../Typography";

interface ToastProps {
  readonly toast: ToastType;
  readonly onRemove: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: CircleWavyWarning,
};

const iconStyles = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
};

export function Toast({ toast, onRemove }: ToastProps) {
  const Icon = toastIcons[toast.type];

  return (
    <div
      className={cn(
        "flex w-full max-w-sm items-center gap-3 rounded-lg border p-2 shadow-lg",
        "transform transition-all duration-300 ease-out",
        "border-neutral-200 bg-white text-neutral-950 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
        "hover:shadow-xl",
        toast.exiting ? "animate-slide-out-right" : "animate-slide-in-right",
      )}
      role="alert"
      aria-live="assertive"
    >
      <Icon
        className={cn(
          "mt-0.5 h-5 w-5 flex-shrink-0",
          toast.type === "success" ? "text-green-600" : "text-red-600",
        )}
        weight="fill"
      />

      <div className="mt-[2px] min-w-0 flex-1">
        <Preset6>{toast.message}</Preset6>
      </div>

      {toast.link && toast.linkAction && (
        <button
          className="underline-offset-3"
          onClick={() => toast.linkAction?.()}
        >
          <Preset6 className="underline">{toast.link}</Preset6>
        </button>
      )}

      <button
        onClick={() => onRemove(toast.id)}
        className={cn(
          "ml-2 rounded-md p-1 transition-colors duration-200",
          "hover:bg-black/10 focus:ring-2 focus:ring-offset-2 focus:outline-none",
          "cursor-custom flex-shrink-0",
        )}
        aria-label="Fechar notificação"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
