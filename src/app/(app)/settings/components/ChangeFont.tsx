"use client";
import { Monospace } from "@/components/ui/icons/monospace";
import { SansSerif } from "@/components/ui/icons/sans-serif";
import { Serif } from "@/components/ui/icons/serif";
import { useFont } from "@/contexts/font-context";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useToaster } from "@/hooks/useToaster";
import { OptionProps, PreferenceSelector } from "./PreferenceSelector";

type FontType = "source" | "inter" | "noto";

export function ChangeFont() {
  const { fontFamily, setFontFamily } = useFont();
  const isMounted = useIsMounted();
  const { success } = useToaster();

  const options: OptionProps<FontType>[] = [
    {
      icon: <SansSerif />,
      title: "Sans-serif",
      value: "inter",
      description: "Clean and modern, easy to read.",
    },
    {
      icon: <Serif />,
      title: "Serif",
      value: "noto",
      description: "Classic and elegant for a timeless feel.",
    },
    {
      icon: <Monospace />,
      title: "Monospace",
      value: "source",
      description: "Code-like, great for a technical vibe.",
    },
  ];

  if (!isMounted) return null;

  return (
    <PreferenceSelector
      title="Font Theme"
      subtitle="Choose your font theme:"
      options={options}
      selected={fontFamily as FontType}
      onApply={(t) => {
        setFontFamily(t);
        success("Settings updated successfully!");
      }}
    />
  );
}
