import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopNav } from "./TopNav";

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex flex-1">
        <AppSidebar collapsed={sidebarCollapsed} />
        <main className="flex-1 p-6 overflow-auto animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
