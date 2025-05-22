import { PageHeader } from "@/components/headers/page-header";
import { Sidebar } from "@/components/sidebar";

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
