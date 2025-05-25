import ThemeToggle from "@/components/ThemeToggle";
import { FontProvider } from "@/contexts/font-context";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-neutral-100 dark:bg-neutral-700">
      <FontProvider>{children}</FontProvider>
      {/* Just to test */}
      <ThemeToggle />
    </main>
  );
}
