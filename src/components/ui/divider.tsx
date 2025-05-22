import { twMerge } from "tailwind-merge";

export function Divider({ className }: { className?: string }) {
  return (
    <hr
      className={twMerge(
        "w-full border-neutral-200 dark:border-neutral-800",
        className,
      )}
    />
  );
}
