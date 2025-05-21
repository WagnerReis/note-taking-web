"use client";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

export function useResponsive() {
  const [isMounted, setIsMounted] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return {
      isDesktop: false,
      isTablet: false,
      isMobile: true,
      isMounted,
    };
  }

  return {
    isDesktop,
    isTablet,
    isMobile,
    isMounted,
  };
}
