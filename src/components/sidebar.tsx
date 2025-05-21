"use client";
import { useResponsive } from "@/hooks/use-responsive";

export function Sidebar() {
  const { isDesktop } = useResponsive();

  return (
    <>
      {isDesktop && (
        <aside className="w-[272px] min-h-screen border-r border-neutral-200 dark:border-neutral-800">
          Sidebar
        </aside>
      )}
    </>
  );
}
