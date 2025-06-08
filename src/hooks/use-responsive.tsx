"use client";
import { useMediaQuery } from "react-responsive";
import { useIsMounted } from "./use-is-mounted";

export function useResponsive() {
  const isMounted = useIsMounted();

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isSmallScreen = isTablet || isMobile;

  if (!isMounted) {
    return {
      isDesktop: false,
      isTablet: false,
      isMobile: true,
      isSmallScreen,
      isMounted,
    };
  }

  return {
    isDesktop,
    isTablet,
    isMobile,
    isMounted,
    isSmallScreen,
  };
}
