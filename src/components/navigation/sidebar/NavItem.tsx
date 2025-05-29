import { ChevronRightMD } from "@/components/ui/icons/chevron-right-md";
import { ReactElement, MouseEventHandler, cloneElement } from "react";
import { twMerge } from "tailwind-merge";

interface NavItemProps {
  icon: ReactElement<any, any>;
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={twMerge(
        "rounded-8 cursor-custom flex w-full items-center gap-2 p-2 text-left transition-colors",
        "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
        isActive &&
          "bg-neutral-100 text-neutral-950 dark:bg-neutral-800 dark:text-white",
      )}
    >
      {cloneElement(icon, {
        className: twMerge(
          icon.props.className,
          isActive && "text-blue-500 dark:text-blue-500",
        ),
      })}
      <span className="flex-1">{label}</span>
      {isActive && <ChevronRightMD className="ml-auto" />}
    </button>
  );
}
