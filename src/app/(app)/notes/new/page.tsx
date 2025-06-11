"use client";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { formatTags } from "@/utils/formatTags";
import { NoteForm, NoteFormData } from "../../components/NoteForm";

export default function NewNotePage() {
  const { addNote, setView } = useNotesStore();

  async function onSubmit(data: NoteFormData) {
    const { title, tags, content } = data;

    const tagsArray = formatTags(tags);

    await addNote({
      title,
      tags: tagsArray,
      content,
      status: "active",
    });
    setView("show");
  }
  return <NoteForm onSubmit={onSubmit} />;
}
