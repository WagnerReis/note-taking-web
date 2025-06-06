"use client";
import { Preset3, Preset5, Preset6 } from "@/components/Typography";
import { formatDate } from "@/utils/formatDate";
import { Tag } from "./Tag";
import { twMerge } from "tailwind-merge";
import { useResponsive } from "@/hooks/use-responsive";
import { Note as NoteInterface } from "@/store/notes/useNotesStore";

export interface NoteProps {
  note: NoteInterface;
  selected: boolean;
  onSelected: (note: NoteInterface) => void;
}

export function Note({ note, onSelected, selected = false }: NoteProps) {
  const { isDesktop } = useResponsive();

  return (
    <div
      onClick={() => onSelected(note)}
      className={twMerge(
        "rounded-6 flex w-full flex-col gap-3 p-2",
        isDesktop && selected && "bg-neutral-100 dark:bg-neutral-800",
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
