"use client";
import { SidebarAllNotes } from "@/app/(app)/components/SidebarAllNotes";
import { AuthProvider } from "@/components/auth-provider";
import { Loading } from "@/components/Loading";
import { useAuth } from "@/hooks/use-auth";
import { useResponsive } from "@/hooks/use-responsive";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NoteContent } from "./components/NoteContent";
import { SidebarRight } from "./components/SidebarRight";
import NewNotePage from "./notes/new/page";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { isDesktop } = useResponsive();
  const router = useRouter();
  const { fetchNotes, selectedNote, view } = useNotesStore();

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthProvider>
      <div className="flex">
        <SidebarAllNotes />
        {isDesktop && (
          <>
            {selectedNote || view === "show" ? (
              <NoteContent />
            ) : (
              <NewNotePage />
            )}
            {selectedNote && <SidebarRight />}
          </>
        )}
      </div>
    </AuthProvider>
  );
}
