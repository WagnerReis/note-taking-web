"use client";
import { Preset1, Preset4, Preset5, Preset6 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "@/components/ui/icons/arrow-left2";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useResponsive } from "@/hooks/use-responsive";
import { useRouter } from "next/navigation";
import { cloneElement, ReactElement, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface OptionProps<T> {
  icon: ReactElement<any, any>;
  title: string;
  value: T;
  description: string;
}

interface PreferenceSelectorProps<T> {
  title: string;
  subtitle: string;
  options: OptionProps<T>[];
  selected: T;
  onApply: (value: T) => void;
  backHref?: string;
}

export function PreferenceSelector<T extends string>({
  title,
  subtitle,
  options,
  selected,
  onApply,
  backHref = "/settings",
}: PreferenceSelectorProps<T>) {
  const { isDesktop } = useResponsive();
  const isMounted = useIsMounted();
  const router = useRouter();
  const [current, setCurrent] = useState<T>(selected);

  useEffect(() => {
    setCurrent(selected);
  }, [selected]);

  if (!isMounted) return null;

  return (
    <div
      className={twMerge(
        "mt-6 px-4 md:px-8 lg:mt-8",
        isDesktop ? "w-[538px]" : "w-full"
      )}
    >
      {!isDesktop && (
        <button
          className="flex items-center gap-2"
          onClick={() => router.push(backHref)}
        >
          <ArrowLeft2 width={20} height={20} />
          <Preset4 className="mt-1 text-neutral-600 dark:text-neutral-300">
            Settings
          </Preset4>
        </button>
      )}

      <Preset1 className="mt-3 text-neutral-950 dark:text-white">
        {title}
      </Preset1>
      <Preset5 className="mt-2 text-neutral-700 dark:text-neutral-300">
        {subtitle}
      </Preset5>

      <div className="mt-6 space-y-4">
        {options.map((option) => {
          const isSelected = current === option.value;
          return (
            <div
              key={option.title}
              onClick={() => setCurrent(option.value)}
              className={twMerge(
                "rounded-12 cursor-custom flex items-center border border-neutral-200 p-4 dark:border-neutral-800",
                isSelected && "bg-neutral-100 dark:bg-neutral-800"
              )}
            >
              <div
                className={twMerge(
                  "rounded-12 flex h-10 w-10 items-center justify-center",
                  "border border-neutral-200 dark:border-neutral-800",
                  isSelected && "bg-white dark:bg-neutral-950"
                )}
              >
                {cloneElement(option.icon, {
                  className: twMerge(
                    option.icon.props.className,
                    "text-neutral-950 dark:text-white"
                  ),
                })}
              </div>
              <div className="ml-4 space-y-1.5">
                <Preset4 className="text-neutral-950 dark:text-white">
                  {option.title}
                </Preset4>
                <Preset6 className="text-neutral-600 dark:text-neutral-300">
                  {option.description}
                </Preset6>
              </div>
              <div
                className={twMerge(
                  "ml-auto h-4 w-4 rounded-full border-2 border-neutral-600",
                  isSelected && "border-4 border-blue-500"
                )}
              />
            </div>
          );
        })}
      </div>
      <div
        onClick={() => onApply(current)}
        className="mt-250 ml-auto w-[132px] lg:mt-300"
      >
        <Button intent="primary" text="Apply changes" />
      </div>
    </div>
  );
}
