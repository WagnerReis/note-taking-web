"use client";

import { SidebarAllNotes } from "@/components/SidebarAllNotes";
import { SidebarSettings } from "@/components/SidebarSettings";
import { useResponsive } from "@/hooks/use-responsive";

export default function HomePage() {
  const {isDesktop } = useResponsive()
  return <main className="h-screen">
    {isDesktop && <SidebarAllNotes />}
    {/* <SidebarSettings /> */}
  </main>;
}
