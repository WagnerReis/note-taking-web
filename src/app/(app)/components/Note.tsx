"use client";
import { Preset3, Preset6 } from "@/components/Typography";
import { useResponsive } from "@/hooks/use-responsive";
import { Note as NoteInterface, useNotesStore } from "@/store/notes/useNotesStore";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Tag } from "./Tag";

export interface NoteProps {
  note: NoteInterface;
}

export function Note({ note, }: NoteProps) {
  const { isSmallScreen } = useResponsive();
  const { selectedNote, setSelectedNote } = useNotesStore();
  const router = useRouter();

  return (
    <div
      onClick={() => {
        setSelectedNote(note);

        if (isSmallScreen) {
          router.push(`/notes/${note.id}`);
        }
      }}
      className={twMerge(
        "rounded-6 flex w-full flex-col gap-3 p-2",
        selectedNote?.id === note.id && "bg-neutral-100 dark:bg-neutral-800",
      )}
    >
      <Preset3 className="text-neutral-950 dark:text-white">
        {note.title}
      </Preset3>
      <div className="flex gap-2">
        {note.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      <Preset6 className="text-neutral-700 dark:text-neutral-200">
        {formatDate(note.createdAt)}
      </Preset6>
    </div>
  );
}
