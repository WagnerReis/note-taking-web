"use client";

import { AuthProvider } from "@/components/auth-provider";
import { SidebarAllNotes } from "@/components/SidebarAllNotes";
import { useAuth } from "@/hooks/use-auth";
import { useResponsive } from "@/hooks/use-responsive";
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

  const { isDesktop } = useResponsive();
  return (
    <>
      <AuthProvider>
        <main className="h-screen">{isDesktop && <SidebarAllNotes />}</main>;
      </AuthProvider>
    </>
  );
}
