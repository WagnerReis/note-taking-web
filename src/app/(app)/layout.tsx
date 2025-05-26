import { PageHeader } from "@/components/headers/PageHeader";
import { Sidebar } from "@/components/navigation/sidebar/Sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="flex w-full flex-col">
        <PageHeader />
        {children}
      </div>
    </>
  );
}
