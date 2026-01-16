import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumb?: string[];
}

export function AdminLayout({ children, title, breadcrumb }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
        <AdminHeader
          title={title}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          breadcrumb={breadcrumb}
        />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
