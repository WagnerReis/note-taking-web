"use client";
import { SidebarAllNotes } from "@/app/(app)/components/SidebarAllNotes";
import { AuthProvider } from "@/components/auth-provider";
import { useAuth } from "@/hooks/use-auth";
import { useResponsive } from "@/hooks/use-responsive";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NoteContent } from "./components/NoteContent";
import { SidebarRight } from "./components/SidebarRight";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { isDesktop } = useResponsive();
  const router = useRouter();
  const { fetchNotes, selectedNote } = useNotesStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/");
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <AuthProvider>
      <div className="flex">
        <SidebarAllNotes />
        {isDesktop && (
          <>
            {selectedNote && <NoteContent />}
            {selectedNote && <SidebarRight />}
          </>
        )}
      </div>
    </AuthProvider>
  );
}
