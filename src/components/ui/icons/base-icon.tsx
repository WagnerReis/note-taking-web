"use client";

import clsx from "clsx";
import { useEffect, useState, ReactNode } from "react";

type BaseIconProps = {
  children: ReactNode;
  className?: string;
};

export default function BaseIcon({ children, className }: BaseIconProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  console.log(className);
  return (
    <svg
      width={24}
      height={24}
      viewBox={"0 0 24 24"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("text-neutral-900 dark:text-neutral-300", className)}
    >
      {children}
    </svg>
  );
}
