import { Preset6 } from "@/components/Typography";
import { cloneElement, MouseEventHandler, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface MenuItemProps {
  icon: ReactElement<any, any>;
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  showLabel: boolean;
  isTablet: boolean;
}

export function MenuItem({
  icon,
  label,
  isActive,
  onClick,
  showLabel,
  isTablet,
}: MenuItemProps) {
  return (
    <li
      className={twMerge(
        "flex h-[50px] flex-grow flex-col items-center justify-center",
        isTablet
          ? "border-r border-neutral-100 last:border-r-0 dark:border-neutral-800"
          : "",
      )}
    >
      <button
        className={twMerge(
          "md:w[80px] rounded-4 flex h-[32px] w-[68.6px] flex-col items-center justify-center md:h-[50px] md:w-[80px]",
          isActive ? "bg-blue-50 text-blue-500 dark:text-blue-500" : "",
        )}
        onClick={onClick}
      >
        {cloneElement(icon, {
          className: twMerge(
            icon.props.className,
            isActive && "text-blue-500 dark:text-blue-500",
          ),
        })}
        {showLabel && (
          <Preset6
            className={twMerge(
              "text-neutral-600 dark:text-neutral-400",
              isActive && "text-blue-500 dark:text-blue-500",
            )}
          >
            {label}
          </Preset6>
        )}
      </button>
    </li>
  );
}