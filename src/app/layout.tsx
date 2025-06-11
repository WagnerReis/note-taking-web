import { MenuBar } from "@/components/navigation/menu-bar/MenuBar";
import ThemeToggle from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/toaster";
import { FontProvider } from "@/contexts/font-context";
import { ToastProvider } from "@/contexts/ToastContext";
import { CustomThemeProvider } from "@/providers/custom-theme-provider";
import type { Metadata } from "next";
import { inter, notoSerif, sourceCodePro } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Note Taking App",
  description: "A note taking app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceCodePro.variable} ${notoSerif.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <CustomThemeProvider>
          <FontProvider>
            <ToastProvider>
              <main className="flex h-screen">{children}</main>
              <MenuBar />
              {/* Just to test */}
              <ThemeToggle />
              <Toaster />
            </ToastProvider>
          </FontProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
