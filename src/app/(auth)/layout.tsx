import ThemeToggle from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-700">
      {children}
      {/* Just to test */}
      <ThemeToggle />
    </main>
  );
}
