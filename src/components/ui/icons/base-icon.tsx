"use client";

import { useEffect, useState, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type BaseIconProps = {
  children: ReactNode;
  className?: string;
  width?: number;
  height?: number;
};

export default function BaseIcon({
  children,
  className,
  width = 24,
  height = 24,
}: BaseIconProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("text-neutral-900 dark:text-neutral-300", className)}
    >
      {children}
    </svg>
  );
}
