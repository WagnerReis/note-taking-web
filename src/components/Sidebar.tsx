"use client";
import { useResponsive } from "@/hooks/use-responsive";

export function Sidebar() {
  const { isDesktop } = useResponsive();

  return (
    <>
      {isDesktop && (
        <aside className="min-h-screen w-[272px] border-r border-neutral-200 dark:border-neutral-800">
          Sidebar
        </aside>
      )}
    </>
  );
}
