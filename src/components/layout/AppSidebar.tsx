import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  collapsed: boolean;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Briefcase, label: "Job Postings", path: "/jobs" },
  { icon: Users, label: "Applicants", path: "/applicants" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar({ collapsed }: AppSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
        "hidden lg:flex"
      )}
    >
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent/50",
            collapsed && "justify-center"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-sidebar-primary">v1</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">
                Mini ATS
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                Free Plan
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
