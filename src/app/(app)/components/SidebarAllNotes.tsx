"use client";
import { Loading } from "@/components/Loading";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useResponsive } from "@/hooks/use-responsive";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Preset1, Preset5 } from "../../../components/Typography";
import { Button } from "../../../components/ui/button";
import { Divider } from "../../../components/ui/divider";
import { Plus } from "../../../components/ui/icons/plus";
import { Note } from "./Note";

export function SidebarAllNotes() {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const { notes, selectedNote, setSelectedNote, setView, isArchived } = useNotesStore();
  const isMounted = useIsMounted();
  const router = useRouter();

  const isSmallScreen = isMobile || isTablet;

  if (!isMounted) {
    return <Loading />;
  }

  function handleOpenCreateNote() {
    setSelectedNote(null);
    setView("create");
    if (isSmallScreen) {
      router.push("/notes/new");
    }
  }

  return (
    <div
      className={twMerge(
        "h-[calc(100vh-5.0625rem)] overflow-auto p-200 lg:border-r lg:border-neutral-200 lg:p-250 dark:border-neutral-800",
        isDesktop && "max-w-[272px] min-w-[272px]",
        isSmallScreen && "w-full",
      )}
    >
      {isDesktop && (
        <header onClick={handleOpenCreateNote}>
          <Button intent="primary" text="+ Create New Note" />
        </header>
      )}

      {isSmallScreen && <Preset1>All Notes</Preset1>}

      {!notes.length && !isArchived && (
        <div className="rounded-8 mt-4 border border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-700 dark:bg-neutral-800">
          <Preset5>
            You don’t have any notes yet. Start a new note to capture your thoughts and ideas.
          </Preset5>
        </div>
      )}

      {!notes.length && isArchived && (
        <div>
          <div className="rounded-8 mt-4 p-2">
            <Preset5>
              All your archived notes are stored here. You can restore or delete them anytime.
            </Preset5>
          </div>

          <div className="rounded-8 mt-4 border border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-700 dark:bg-neutral-800 underline-offset-3">
            <Preset5>
              No notes have been archived yet. Move notes here for safekeeping, or <span className="underline">create a new note</span>.
            </Preset5>
          </div>
        </div>
      )}

      <div className="cursor-custom mt-4">
        {notes.map((note, index) => {
          const isLast = index === notes.length - 1;
          const isSelected = selectedNote?.id === note.id && isDesktop;
          const isNextSelected =
            notes[index + 1]?.id === selectedNote?.id && isDesktop;

          return (
            <div key={note.id}>
              <Note note={note} />
              {!isLast && !isSelected && !isNextSelected ? (
                <Divider />
              ) : (
                <hr className="border-transparent dark:border-transparent" />
              )}
            </div>
          );
        })}
      </div>

      {isSmallScreen && (
        <button
          className={twMerge(
            "absolute right-4 bottom-[72px] flex h-[3rem] w-[3rem] items-center justify-center",
            "rounded-full bg-blue-500 md:right-8 md:bottom-[106px] md:h-[4rem] md:w-[4rem]",
          )}
          onClick={handleOpenCreateNote}
        >
          <Plus className="folt-bold h-6 w-6 text-white dark:text-white" />
        </button>
      )}
    </div>
  );
}
