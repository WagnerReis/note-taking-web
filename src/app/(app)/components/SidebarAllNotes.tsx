"use client";
import { useResponsive } from "@/hooks/use-responsive";
import { Preset1, Preset5 } from "../../../components/Typography";
import { Button } from "../../../components/ui/button";
import { twMerge } from "tailwind-merge";
import { Plus } from "../../../components/ui/icons/plus";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { Divider } from "../../../components/ui/divider";
import { Note, NoteProps } from "./Note";
import { useState } from "react";

const notes = [
  {
    id: "683604b77d6665d2b5ce357d",
    title: "tal coisa",
    content: "content",
    status: "archived",
    tags: ["React", "Node"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "683604b77d6665d2b5ce3511",
    title: "tal coisa",
    content: "content",
    status: "archived",
    tags: ["React", "Node"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "683604b17d6665d2b5ce3511",
    title: "tal coisa",
    content: "content",
    status: "archived",
    tags: ["React", "Node"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function SidebarAllNotes() {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const [selectedNoteId, setSelectedNoteId] = useState<string>("")
  const isMounted = useIsMounted();

  const isSmallScreen = isMobile || isTablet;

  if (!isMounted) {
    return null;
  }

  function handleSelectNote(noteId: string) {
    setSelectedNoteId(noteId)
  }

  return (
    <div
      className={twMerge(
        "h-[calc(100vh-5.0625rem)] p-200 lg:border-r lg:border-neutral-200 lg:p-250 dark:border-neutral-800",
        isDesktop && "w-[272px]",
        isSmallScreen && "w-full",
      )}
    >
      {isDesktop && (
        <header>
          <Button intent="primary" text="+ Create New Note" />
        </header>
      )}

      {isSmallScreen && <Preset1>All Notes</Preset1>}

      {!notes.length && (
        <div className="rounded-8 mt-4 border border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-700 dark:bg-neutral-800">
          <Preset5>
            You don’t have any notes yet. Start a new note to capture your
            thoughts and ideas
          </Preset5>
        </div>
      )}

      <div className="mt-4 cursor-custom">
        {notes.map((note, index) => {
          const isLast = index === notes.length - 1;
          const isSelected = selectedNoteId === note.id && isDesktop;
          const isNextSelected = notes[index + 1]?.id === selectedNoteId && isDesktop;

          return (
            <div key={note.id}>
              <Note
                note={note}
                selected={isSelected}
                onSelected={handleSelectNote}
              />
              {(!isLast && !isSelected && !isNextSelected) ? <Divider /> : <hr className="border-transparent dark:border-transparent" />}
            </div>
          );
        })}
      </div>

      {(isMobile || isTablet) && (
        <button className="absolute right-4 bottom-[72px] flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-blue-500 md:right-8 md:bottom-[106px] md:h-[4rem] md:w-[4rem]">
          <Plus className="folt-bold h-6 w-6 text-white dark:text-white" />
        </button>
      )}
    </div>
  );
}


