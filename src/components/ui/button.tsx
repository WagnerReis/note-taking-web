import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Preset3 } from "../Typography";

const buttonStyles = cva("rounded-8  w-full h-11 cursor-custom", {
  variants: {
    intent: {
      primary: [
        "bg-blue-500",
        "hover:bg-blue-700",
        "hover:transition-[0.3]",
        "text-white",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-offset-white",
        "dark:focus:ring-offset-neutral-950",
        "focus:ring-neutral-300",
        "dark:focus:ring-neutral-500",
      ],
      secondary: [
        "border border-neutral-300 dark:border-neutral-600 flex items-center pl-4 gap-2",
      ],
    },
    defaultVariants: {
      intent: "primary",
    },
  },
});

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  text: string;
  icon?: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}

export function Button({ intent, text, icon, type, onClick, ...props }: ButtonProps) {
  return (
    <button
      type={type || "button"}
      className={twMerge(buttonStyles({ intent }))}
      onClick={onClick}
      {...props}
    >
      {intent === "secondary" && icon}
      <Preset3>{text}</Preset3>
    </button>
  );
}