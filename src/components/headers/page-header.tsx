"use client";
import { PageHeaderDesktop } from "./page-header-desktop";
import { PageHeaderCompact } from "./page-header-compact";
import { useResponsive } from "@/hooks/use-responsive";

export function PageHeader() {
  const { isDesktop, isTablet, isMobile } = useResponsive();

  return (
    <>
      {isDesktop && <PageHeaderDesktop />}
      {(isTablet || isMobile) && <PageHeaderCompact />}
    </>
  );
}
