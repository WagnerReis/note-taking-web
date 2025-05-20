"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type FontFamily = "source" | "noto" | "inter";

interface FontContextType {
  fontFamily: FontFamily;
  setFontFamily: (font: FontFamily) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [fontFamily, setFontFamily] = useState<FontFamily>("inter");

  useEffect(() => {
    const savedFont = localStorage.getItem("preferredFont") as FontFamily;
    if (savedFont && ["source", "noto", "inter"].includes(savedFont)) {
      setFontFamily(savedFont);
    }
  }, []);

  const updateFontFamily = (font: FontFamily) => {
    setFontFamily(font);
    localStorage.setItem("preferredFont", font);
  };

  return (
    <FontContext.Provider
      value={{ fontFamily, setFontFamily: updateFontFamily }}
    >
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}
