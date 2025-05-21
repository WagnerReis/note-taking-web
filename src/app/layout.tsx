import type { Metadata } from "next";
import "./globals.css";
import { CustomThemeProvider } from "@/providers/custom-theme-provider";
import { inter, notoSerif, sourceCodePro } from "./fonts";
import ThemeToggle from "@/components/theme-toggle";
import { PageHeader } from "@/components/headers/page-header";
import { Sidebar } from "@/components/sidebar";

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
          <main className="w-full h-screen flex">
            <Sidebar />
            <div className="flex flex-col w-full">
              <PageHeader />
              {children}
            </div>
          </main>

          {/* Just to test */}
          <ThemeToggle />
        </CustomThemeProvider>
      </body>
    </html>
  );
}
