import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Preset3 } from "../typography";

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
      secondary: ["bg-neutral-100"],
    },
    defaultVariants: {
      intent: "primary",
    },
  },
});

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  text: string;
  type?: "button" | "submit";
}

export function Button({ intent, text, type, ...props }: ButtonProps) {
  return (
    <button
      type={type || "button"}
      className={twMerge(buttonStyles({ intent }))}
      {...props}
    >
      <Preset3>{text}</Preset3>
    </button>
  );
}
