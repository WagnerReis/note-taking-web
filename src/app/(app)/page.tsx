"use client";

import { AuthProvider } from "@/components/auth-provider";
import { SidebarAllNotes } from "@/app/(app)/components/SidebarAllNotes";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
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
      <SidebarAllNotes />
    </AuthProvider>
  );
}
