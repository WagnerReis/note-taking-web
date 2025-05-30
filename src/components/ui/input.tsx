"use client";
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { Hide } from "./icons/hide";
import { Show } from "./icons/show";
import { InfoCircle } from "./icons/info-circle";
import { Preset4, Preset6 } from "../Typography";
import Link from "next/link";
import { useFont } from "@/contexts/font-context";

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
  type?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  variant?: InputVariant;
  isLogin?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  showPasswordToggle?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      label,
      name,
      leftIcon,
      rightIcon,
      error,
      hint,
      disabled,
      isLogin,
      labelClassName = "",
      inputClassName = "",
      showPasswordToggle,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { fontFamily } = useFont();

    const inputType =
      showPasswordToggle && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    const handleTogglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

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

          // Hover
          "hover:bg-neutral-50 dark:hover:bg-neutral-900",
        ],
      },

      disabled: {
        input: [
          // Background and border
          "bg-neutral-50 dark:bg-neutral-900",
          "border-neutral-200 dark:border-neutral-700",

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
          "focus:ring-neutral-300 dark:focus:ring-neutral-600",
        ],
      },

      error: {
        input: [
          // Background
          "bg-neutral-50 dark:bg-neutral-800",
          // Border
          "border-red-500 dark:border-red-400",

          // Text colors
          "text-neutral-950 dark:text-white",

          // Placeholder colors
          "placeholder-neutral-500 dark:placeholder-neutral-800",
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
        <div className="relative flex w-full flex-col gap-1.5">
          {label && (
            <div className="flex items-end">
              <Preset4
                className={twMerge(
                  "text-neutral-950 dark:text-white",
                  labelClassName,
                )}
              >
                {label}
              </Preset4>

              {isLogin && (
                <Link
                  href="/forgot-password"
                  className="cursor-custom ml-auto text-neutral-600 underline underline-offset-4 dark:text-neutral-400"
                >
                  <Preset6>Forgot</Preset6>
                </Link>
              )}
            </div>
          )}

          <input
            name={name}
            ref={ref}
            type={inputType}
            {...props}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={twMerge(
              "text-preset-5 rounded-8 min-h-[42px] px-200 py-150 transition-all duration-200",
              "cursor-custom border border-neutral-300 dark:border-neutral-600",
              leftIcon && "pr-200 pl-[46px]",
              rightIcon && "pr-[44px] pl-200",
              twJoin(getInputStyles()),
              `font-${fontFamily} text-font-${fontFamily}`,
              inputClassName,
            )}
          />

          {hint && !error && (
            <div className="flex items-center gap-100 text-neutral-600 dark:text-neutral-400">
              <InfoCircle className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
              <Preset6>{hint}</Preset6>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-100 text-red-600 dark:text-red-500">
              <InfoCircle className="h-4 w-4 text-red-600 dark:text-red-500" />
              <Preset6>{error}</Preset6>
            </div>
          )}

          {showPasswordToggle && type === "password" && (
            <button
              className="cursor-custom absolute top-[44px] right-200"
              type="button"
              onClick={handleTogglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <Hide className="h-5 w-5" />
              ) : (
                <Show className="h-5 w-5" />
              )}
            </button>
          )}

          {leftIcon && (
            <div className="absolute top-[calc(42px/2-10px)] left-200">
              {leftIcon}
            </div>
          )}

          {rightIcon && !showPasswordToggle && (
            <button
              className="rounded-0 cursor-custom absolute top-[41px] right-200 px-0"
              type="button"
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
