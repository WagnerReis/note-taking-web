"use client";
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

type InputVariant = "default" | "error" | "focused" | "disabled";

enum InputVariantEnum {
  DEFAULT = "default",
  ERROR = "error",
  FOCUSED = "focused",
  DISABLED = "disabled",
}

/**
 * Props for the Input component, extending standard HTML input attributes.
 * @param label Optional text label for the input field
 * @param placeholder Optional placeholder text
 * @param hint Optional hint text for additional guidance
 * @param error Optional error message to display
 * @param className Optional custom CSS class for the input container
 * @param leftIcon Optional React node to render an icon on the left side of the input
 * @param rightIcon Optional React node to render an icon on the right side of the input
 * @param disabled Optional flag to disable the input
 * @param variant Optional input variant (default, error, focused, disabled)
 * @param labelClassName Optional custom CSS class for the label
 * @param inputClassName Optional custom CSS class for the input element
 * @param passwordToggleVisibility Optional function to toggle password visibility
 */
type InputProps = {
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  variant?: InputVariant;
  labelClassName?: string;
  inputClassName?: string;
  passwordToggleVisibility?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      leftIcon,
      rightIcon,
      error,
      disabled,
      labelClassName = "",
      inputClassName = "",
      passwordToggleVisibility,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const getBaseVariant = (): InputVariant => {
      if (disabled) {
        return InputVariantEnum.DISABLED;
      }
      if (error) {
        return InputVariantEnum.ERROR;
      }
      return InputVariantEnum.DEFAULT;
    };

    const baseVariant = getBaseVariant();

    const variantStyles = {
      default: {
        input: [
          // Text colors
          "text-neutral-950 dark:text-white",
          // Placeholder colors
          "placeholder-neutral-500 dark:placeholder-neutral-400",
        ],
      },

      disabled: {
        input: [
          // Background and border
          "bg-neutral-50 dark:bg-neutral-900",
          "border-neutral-200 dark:border-neutral-700",
          "min-h-[42px]",

          // Text and placeholder
          "text-neutral-300 dark:text-neutral-600",
          "placeholder:text-neutral-300 placeholder:dark:text-neutral-600",

          // Cursor
          "cursor-not-allowed",
        ],
      },

      focused: {
        input: [
          // Focus ring styling
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-offset-4",
          "focus:ring-offset-white dark:focus:ring-offset-neutral-950",
          "focus:ring-neutral-300 dark:focus:ring-neutral-500",
        ],
      },

      error: {
        input: [
          // Border
          "border-red-500 dark:border-red-400",

          // Text colors
          "text-neutral-950 dark:text-white",

          // Placeholder colors
          "placeholder-neutral-500 dark:placeholder-neutral-400",
        ],
      },
    };

    const getInputStyles = () => {
      const baseStyles = variantStyles[baseVariant].input;

      if (isFocused && !disabled) {
        return [...baseStyles, ...variantStyles.focused.input];
      }

      return baseStyles;
    };

    return (
      <div className={twMerge("w-full", props.className)}>
        <div className="relative w-full flex flex-col gap-1.5 transition-all duration-300 ease-in-out">
          {label && (
            <label
              className={twMerge(
                "text-preset-4 text-neutral-950 dark:text-white",
                labelClassName,
              )}
            >
              {label}
            </label>
          )}

          <input
            name={name}
            ref={ref}
            {...props}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={twMerge(
              "min-h-[42px] py-150 px-200 rounded-8 text-preset-5 transition-all duration-200",
              "border border-neutral-300 dark:border-neutral-600",
              leftIcon && "pl-[44px] pr-200",
              rightIcon && "pr-[44px] pl-200",
              twJoin(getInputStyles()),
              inputClassName,
            )}
          />

          {leftIcon && (
            <div className="absolute left-200 top-[41px]">{leftIcon}</div>
          )}

          {rightIcon && (
            <button
              className="absolute right-200 top-[41px] cursor-pointer"
              type="button"
              onClick={passwordToggleVisibility}
            >
              {rightIcon}
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
