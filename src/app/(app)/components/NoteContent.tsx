"use client";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { formatTags } from "@/utils/formatTags";
import { NoteForm, NoteFormData } from "./NoteForm";

export function NoteContent() {
  const { selectedNote: note, updateNote } = useNotesStore();

  if (!note) {
    return null;
  }


  // console.log("render", note)

  async function onSubmit(data: NoteFormData) {
    const tagsArray = formatTags(data.tags);
    
    await updateNote({
      id: note?.id,
      ...data,
      tags: tagsArray,
    });
  }

  return (
    <NoteForm onSubmit={onSubmit} />
  );
}