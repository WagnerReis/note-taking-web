import { Preset4 } from "@/components/Typography";
import { ChevronRightMD } from "@/components/ui/icons/chevron-right-md";
import { cloneElement, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: ReactElement<any, any>;
  label: string;
  isMobile: boolean;
  isActive: boolean;
  onActive: () => void;
}

export function SidebarItem({ icon, label, isMobile, isActive, onActive }: SidebarItemProps) {
  return (
    <button
      onClick={onActive}
      className={twMerge("py-[10px] w-full px-150 flex gap-2 text-neutral-700 dark:text-neutral-200 items-center cursor-custom rounded-8",
        (isActive && !isMobile) && "bg-neutral-100 dark:bg-neutral-800"
      )}>

      {cloneElement(icon, {
        className: twMerge(
          (isActive && !isMobile) ? "text-blue-500 dark:text-blue-500" : "",
          icon.props.className,
        ),
      })}

      <div className={twMerge("text-neutral-700 dark:text-neutral-200",
        isActive && "text-neutral-950 dark:text-white"
      )}>
        <Preset4>{label}</Preset4>
      </div>

      {(isActive && !isMobile) && <ChevronRightMD className="ml-auto" />}
    </button >
  )
}