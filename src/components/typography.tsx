"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFont } from "@/contexts/font-context";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  preset: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Typography({ children, className, preset }: TypographyProps) {
  const { fontFamily } = useFont();

  return (
    <p className={cn(`text-preset-${preset}`, `font-${fontFamily}`, className)}>
      {children}
    </p>
  );
}

export function Preset1({
  children,
  className,
}: Omit<TypographyProps, "preset">) {
  return (
    <Typography preset={1} className={className}>
      {children}
    </Typography>
  );
}

export function Preset2({
  children,
  className,
}: Omit<TypographyProps, "preset">) {
  return (
    <Typography preset={2} className={className}>
      {children}
    </Typography>
  );
}

export function Preset3({
  children,
  className,
}: Omit<TypographyProps, "preset">) {
  return (
    <Typography preset={3} className={className}>
      {children}
    </Typography>
  );
}

export function Preset4({
  children,
  className,
}: Omit<TypographyProps, "preset">) {
  return (
    <Typography preset={4} className={className}>
      {children}
    </Typography>
  );
}

export function Preset5({
  children,
  className,
}: Omit<TypographyProps, "preset">) {
  return (
    <Typography preset={5} className={className}>
      {children}
    </Typography>
  );
}

export function Preset6({
  children,
  className,
}: Omit<TypographyProps, "preset">) {
  return (
    <Typography preset={6} className={className}>
      {children}
    </Typography>
  );
}
