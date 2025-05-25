"use client";
import { PageHeaderDesktop } from "./PageHeaderDesktop";
import { PageHeaderCompact } from "./PageHeaderCompact";
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
