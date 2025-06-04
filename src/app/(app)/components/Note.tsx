"use client";
import { Preset3, Preset5, Preset6 } from "@/components/Typography";
import { formatDate } from "@/utils/formatDate";
import { Tag } from "./Tag";
import { twMerge } from "tailwind-merge";
import { useResponsive } from "@/hooks/use-responsive";

export interface NoteProps {
  note: {
    id: string;
    title: string;
    content: string;
    status: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
  };
  selected: boolean
  onSelected: (noteId: string) => void
}

export function Note({ note, onSelected, selected = false }: NoteProps) {
  const { isDesktop } = useResponsive();

  return (
    <div
      onClick={() => onSelected(note.id)}
      className={twMerge("flex w-full flex-col gap-3 p-2 rounded-6",
        (isDesktop && selected) && "bg-neutral-100 dark:bg-neutral-800"
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
  )
}