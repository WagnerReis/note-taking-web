"use client";

import { AuthProvider } from "@/components/auth-provider";
import { SidebarAllNotes } from "@/app/(app)/components/SidebarAllNotes";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useResponsive } from "@/hooks/use-responsive";
import { Button } from "@/components/ui/button";
import { Archive } from "@/components/ui/icons/archive";
import { Delete } from "@/components/ui/icons/delete";
import { SidebarRight } from "./components/SidebarRight";
import { NoteContent } from "./components/NoteContent";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const router = useRouter();

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
            <NoteContent />
            <SidebarRight />
          </>
        )}
      </div>
    </AuthProvider>
  );
}
