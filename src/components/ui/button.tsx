import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Preset3 } from "../Typography";

const buttonStyles = cva(
  twMerge(
    "rounded-8 w-full h-11 cursor-custom",
    "hover:transition-colors duration-300",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-offset-white",
    "dark:focus:ring-offset-neutral-950",
    "focus:ring-neutral-300",
    "dark:focus:ring-neutral-500",
  ),
  {
    variants: {
      intent: {
        primary: ["bg-blue-500", "hover:bg-blue-700", "text-white"],
        secondary: [
          "border border-neutral-300 dark:border-neutral-600 flex items-center pl-4 gap-2",
        ],
        tertiary: [
          "bg-neutral-100 dark:bg-neutral-800",
          "hover:bg-neutral-200 dark:hover:bg-neutral-700",
          "text-neutral-600 dark:text-neutral-400",
        ],
      },
      defaultVariants: {
        intent: "primary",
      },
    },
  },
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  text: string;
  icon?: ReactNode;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

export function Button({
  intent,
  text,
  icon,
  type,
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type || "button"}
      className={twMerge(buttonStyles({ intent }), className)}
      onClick={onClick}
      {...props}
    >
      {intent === "secondary" && icon}
      <Preset3>{text}</Preset3>
    </button>
  );
}
