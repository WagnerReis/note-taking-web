"use client";

import clsx from "clsx";
import { useEffect, useState, ReactNode } from "react";

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
      className={clsx("text-neutral-900 dark:text-neutral-300", className)}
    >
      {children}
    </svg>
  );
}
