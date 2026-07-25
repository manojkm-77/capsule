import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata = { title: "CAPSULE Studio" };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-dark">
      <AdminSidebar />
      <main className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">{children}</div>
      </main>
    </div>
  );
}
