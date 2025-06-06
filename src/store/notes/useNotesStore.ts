import { apiClient } from "@/lib/api-client";
import { create } from "zustand";

export interface Note {
  id: string;
  title: string;
  content: string;
  status: "active" | "archived";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  selectedNote: Note | null;
  fetchNotes: () => Promise<void>;
  setSelectedNote: (note: Note | null) => void;
  addNote: (
    note: Omit<Note, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
  updateNote: (id: string, note: Partial<Note>) => Promise<void>;
  removeNote: (noteId: string) => Promise<void>;
  archiveNote: (noteId: string) => Promise<void>;
  unarchiveNote: (noteId: string) => Promise<void>;
  searchNotes: (query: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  selectedNote: null,
  loading: false,
  error: null,

  fetchNotes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get("/notes");

      if (!response.ok) {
        throw new Error("Error on fetch notes");
      }
      const notes = await response.json();
      set({ notes, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "unknown error",
        loading: false,
      });
    }
  },

  setSelectedNote: (note: Note | null) =>
    set((state) => ({ ...state, selectedNote: note })),

  removeNote: async (noteId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.delete(`/notes/${noteId}`);
      
      if (!response.ok) {
        throw new Error("Error on delete note");
      }

      set((state) => ({
        notes: state.notes.filter(note => note.id !== noteId),
        selectedNote: state.selectedNote?.id === noteId ? null : state.selectedNote,
        loading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "unknown error",
        loading: false,
      });
    }
  },

  addNote: async (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => {},
  updateNote: async (id: string, note: Partial<Note>) => {},
  archiveNote: async () => {},
  unarchiveNote: async () => {},
  searchNotes: async () => {},
}));
