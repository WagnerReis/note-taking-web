import { Preset4 } from "@/components/Typography";
import { ChevronRightMD } from "@/components/ui/icons/chevron-right-md";
import { redirect } from "next/navigation";
import { cloneElement, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: ReactElement<any, any>;
  label: string;
  isMobile: boolean;
  redirectPath?: string;
  isActive: boolean;
  onActive: () => void;
}

export function SidebarItem({
  icon,
  label,
  isMobile,
  redirectPath,
  isActive,
  onActive,
}: SidebarItemProps) {
  const handleClick = () => {
    if (isMobile && redirectPath) {
      redirect(redirectPath);
    } else {
      onActive();
    }
  };

  const baseClass =
    "w-full px-150 py-[10px] flex items-center gap-2 rounded-8 cursor-custom text-neutral-700 dark:text-neutral-200";
  const activeClass =
    isActive && !isMobile ? "bg-neutral-100 dark:bg-neutral-800" : "";

  const iconClass =
    isActive && !isMobile ? "text-blue-500 dark:text-blue-500" : "";

  const labelClass =
    isActive && !isMobile
      ? "text-neutral-950 dark:text-white"
      : "text-neutral-700 dark:text-neutral-200";

  return (
    <button onClick={handleClick} className={twMerge(baseClass, activeClass)}>
      {cloneElement(icon, {
        className: twMerge(icon.props.className, iconClass),
      })}

      <div className={labelClass}>
        <Preset4>{label}</Preset4>
      </div>

      {isActive && !isMobile && <ChevronRightMD className="ml-auto" />}
    </button>
  );
}
