"use client";
import { useResponsive } from "@/hooks/use-responsive";
import { Preset1, Preset5 } from "./Typography";
import { Button } from "./ui/button";
import { twMerge } from "tailwind-merge";
import { Plus } from "./ui/icons/plus";

const notes = [];

export function SidebarAllNotes() {
  const { isDesktop, isMobile, isTablet } = useResponsive();

  return (
    <div className={twMerge("h-full lg:border-r lg:border-neutral-200 p-200 lg:p-250 dark:border-neutral-800",
      isDesktop && "w-[272px] flex",
      (isMobile || isTablet) && "w-full"
    )}>
      {isDesktop &&(
        <header>
          <Button intent="primary" text="+ Create New Note" />
        </header>
      )}

      {(isMobile || isTablet) && (
        <Preset1>All Notes</Preset1>
      )}

      <div className="rounded-8 mt-4 border border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-700 dark:bg-neutral-800">
        {!notes.length && (
          <Preset5>
            You don’t have any notes yet. Start a new note to capture your
            thoughts and ideas
          </Preset5>
        )}
      </div>

      {(isMobile || isTablet) && (
        <button className="absolute h-[3rem] w-[3rem] md:h-[4rem] md:w-[4rem] rounded-full bg-blue-500 flex items-center justify-center bottom-[72px] md:bottom-[106px] right-4 md:right-8">
          <Plus className="h-6 w-6 text-white dark:text-white folt-bold" />
        </button>
      )}
    </div>
  );
}
