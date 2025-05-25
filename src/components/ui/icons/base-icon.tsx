import { ReactNode } from "react";
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
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("text-neutral-600 dark:text-neutral-400", className)}
    >
      {children}
    </svg>
  );
}
