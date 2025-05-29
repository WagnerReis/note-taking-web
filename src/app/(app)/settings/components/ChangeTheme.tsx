"use client";
import { Preset1, Preset4, Preset5, Preset6 } from "@/components/Typography"
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "@/components/ui/icons/arrow-left2";
import { DarkMode } from "@/components/ui/icons/dark-mode"
import { LightMode } from "@/components/ui/icons/light-mode"
import { Sun } from "@/components/ui/icons/sun"
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useResponsive } from "@/hooks/use-responsive"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { cloneElement, ReactElement, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

type ThemeType = "light" | "dark" | "system";

interface OptionProps {
  icon: ReactElement<any, any>,
  title: string;
  theme: ThemeType;
  description: string;
}

export function ChangeTheme() {
  const { isDesktop } = useResponsive()
  const isMounted = useIsMounted()
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [newTheme, setNewTheme] = useState(theme);

  useEffect(() => {
    if (theme) {
      setNewTheme(theme as ThemeType);
    }
  }, [theme]);

  if (!isMounted) {
    return null;
  }

  const options: OptionProps[] = [
    {
      icon: <Sun />,
      title: "Light Mode",
      theme: "light",
      description: "Pick a clean and classic light theme"
    },
    {
      icon: <DarkMode />,
      title: "Dark Mode",
      theme: "dark",
      description: "Select a sleek and modern dark theme"
    },
    {
      icon: <LightMode />,
      title: "System",
      theme: "system",
      description: "Select a sleek and modern dark theme"
    }
  ]

  function handleUpdateTheme(theme: ThemeType) {
    setTheme(theme);
    setNewTheme(theme);
  }

  return (
    <div className={twMerge(
      "mt-6 lg:mt-8 px-4 md:px-8",
      isDesktop ? "w-[538px]" : "w-full"
    )}>

      {!isDesktop && (
        <button className="flex gap-2 items-center" onClick={() => router.push("/settings")}>
          <ArrowLeft2 width={20} height={20} />
          <Preset4 className="text-neutral-600 dark:text-neutral-300 mt-1">Settings</Preset4>
        </button>
      )}

      <Preset1 className="text-neutral-950 dark:text-white mt-3">Color Theme</Preset1>
      <Preset5 className="text-neutral-700 dark:text-neutral-300 mt-2">Chose your color theme:</Preset5>

      <div className="space-y-4 mt-6">
        {options.map(option => {
          const selectedTheme = newTheme === option.theme

          return (
            <div
              key={option.title}
              onClick={() => setNewTheme(option.theme)}
              className={twMerge(
                "flex items-center p-4 border border-neutral-200 dark:border-neutral-800 rounded-12 cursor-custom",
                selectedTheme && "bg-neutral-100 dark:bg-neutral-800"
              )}
            >

              <div className={twMerge(
                "h-10 w-10 flex items-center justify-center rounded-12",
                "border border-neutral-200 dark:border-neutral-800",
                selectedTheme && "bg-white dark:bg-neutral-950"
              )}>
                {cloneElement(option.icon, {
                  className: twMerge(
                    option.icon.props.className,
                    "text-neutral-950 dark:text-white",
                  )
                })}
              </div>
              <div className="ml-4 space-y-1.5">
                <Preset4 className="text-neutral-950 dark:text-white">{option.title}</Preset4>
                <Preset6 className="text-neutral-600 dark:text-neutral-300">{option.description}</Preset6 >
              </div>

              <div
                className={twMerge(
                  "ml-auto w-4 h-4 rounded-full border-2 border-neutral-600",
                  selectedTheme && "border-4 border-blue-500"
                )}
              />

            </div>

          )
        })}
      </div>
      <div onClick={() => handleUpdateTheme(newTheme as ThemeType)} className="w-[132px] ml-auto mt-250 lg:mt-300">
        <Button intent="primary" text="Apply changes" />
      </div>
    </div>
  )
}