import type { Metadata } from "next";
import "./globals.css";
import { CustomThemeProvider } from "@/providers/custom-theme-provider";
import { inter, notoSerif, sourceCodePro } from "./fonts";
import ThemeToggle from "@/components/theme-toggle";

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
          {children}
          {/* Just to test */}
          <ThemeToggle />
        </CustomThemeProvider>
      </body>
    </html>
  );
}
