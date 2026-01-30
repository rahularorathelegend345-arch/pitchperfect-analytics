import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  LayoutDashboard, 
  PlusCircle, 
  BarChart3, 
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "New Pitch", href: "/pitch/new", icon: PlusCircle },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Pitches", href: "/pitches", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="font-bold text-lg">PitchEstate</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-sidebar-border">
          <div className={cn(
            "flex items-center gap-3 px-3 py-2 mb-2",
            collapsed && "justify-center px-0"
          )}>
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-sidebar-foreground">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={signOut}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">Sign out</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
