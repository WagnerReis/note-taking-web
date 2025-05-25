import type { Metadata } from "next";
import { CustomThemeProvider } from "@/providers/custom-theme-provider";
import { inter, notoSerif, sourceCodePro } from "./fonts";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";
import { FontProvider } from "@/contexts/font-context";
import { MenuBar } from "@/components/navigation/menu-bar/MenuBar";

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
            <main className="flex h-screen">{children}</main>
            <MenuBar />
            {/* Just to test */}
          </FontProvider>
          <ThemeToggle />
        </CustomThemeProvider>
      </body>
    </html>
  );
}
