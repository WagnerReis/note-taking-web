import { apiClient } from "@/lib/api-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  view: "show" | "create";
  setView: (view: "show" | "create") => void;
  fetchNotes: () => Promise<void>;
  setSelectedNote: (note: Note | null) => void;
  addNote: (
    note: Omit<Note, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
  updateNote: (note: Partial<Note>) => Promise<void>;
  removeNote: (noteId: string) => Promise<void>;
  archiveNote: (noteId: string) => Promise<void>;
  unarchiveNote: (noteId: string) => Promise<void>;
  searchNotes: (query: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      selectedNote: null,
      loading: false,
      error: null,
      view: "show",
      setView: (view: "show" | "create") => set({ view }),

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
            notes: state.notes.filter((note) => note.id !== noteId),
            selectedNote:
              state.selectedNote?.id === noteId ? null : state.selectedNote,
            loading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "unknown error",
            loading: false,
          });
        }
      },

      archiveNote: async (noteId: string) => {
        try {
          const response = await apiClient.patch(`/notes/${noteId}/archive`);

          if (!response.ok) {
            throw new Error("Error on archive note");
          }

          set((state) => ({
            notes: state.notes.filter((note) => note.id !== noteId),
            selectedNote:
              state.selectedNote?.id === noteId ? null : state.selectedNote,
            loading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "unknown error",
            loading: false,
          });
        }
      },

      updateNote: async (note: Partial<Note>) => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.put(`/notes/${note.id}`, note);

          if (!response.ok) {
            throw new Error("Error on update note");
          }

          set((state) => ({
            notes: state.notes.map((n) => {
              if (n.id === note.id) {
                return { ...n, ...note };
              }
              return n;
            }),
            selectedNote:
              state.selectedNote?.id === note.id
                ? ({ ...state.selectedNote, ...note } as Note)
                : state.selectedNote,
            loading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "unknown error",
            loading: false,
          });
        }
      },

      addNote: async (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.post("/notes", note);

          if (!response.ok) {
            throw new Error("Error on add note");
          }

          const newNote = await response.json();
          set((state) => ({
            notes: [newNote, ...state.notes],
            selectedNote: newNote,
            loading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "unknown error",
            loading: false,
          });
        }
      },     
      
      unarchiveNote: async () => {},
      searchNotes: async () => {},
    }),
    {
      name: "@note-taking-app:notes-storage",
      partialize: (state) => ({
        notes: state.notes,
        selectedNote: state.selectedNote,
      }),
    },
  ),
);
