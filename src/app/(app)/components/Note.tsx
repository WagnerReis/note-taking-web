"use client";
import { Preset3, Preset6 } from "@/components/Typography";
import { useResponsive } from "@/hooks/use-responsive";
import { Note as NoteInterface, useNotesStore } from "@/store/notes/useNotesStore";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Tag } from "./Tag";

export interface NoteProps {
  note: NoteInterface;
}

export function Note({ note, }: NoteProps) {
  const { isSmallScreen } = useResponsive();
  const { selectedNote, setSelectedNote } = useNotesStore();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleNoteClick = () => {
    setSelectedNote(note);
    if (isSmallScreen) {
      router.push(`/notes/${note.id}`);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    setHasDragged(true);
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTagsClick = (e: React.MouseEvent) => {
    if (!hasDragged) {
      handleNoteClick();
    } else {
      e.stopPropagation();
    }
  };

  return (
    <div
      onClick={handleNoteClick}
      className={twMerge(
        "rounded-6 flex w-full flex-col gap-3 p-2 cursor-pointer",
        selectedNote?.id === note.id && "bg-neutral-100 dark:bg-neutral-800",
      )}
    >
      <Preset3 className="text-neutral-950 dark:text-white">
        {note.title}
      </Preset3>
      <div 
        ref={ref}
        className={twMerge(
          "flex gap-2 overflow-x-scroll select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleTagsClick}
      >
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
