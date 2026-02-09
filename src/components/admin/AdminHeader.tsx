import { Menu, Eye, ChevronDown, Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  title: string;
  onMenuToggle: () => void;
  breadcrumb?: string[];
}

export function AdminHeader({ title, onMenuToggle, breadcrumb }: AdminHeaderProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const displayName = user?.email?.split("@")[0] || "Admin";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="h-16 bg-header border-b border-header flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-muted rounded-md transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
        
        <button
          onClick={onMenuToggle}
          className="hidden lg:flex p-2 hover:bg-muted rounded-md transition-colors"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>

        <button className="p-2 hover:bg-muted rounded-md transition-colors">
          <Eye className="w-5 h-5 text-primary" />
        </button>

        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="hidden md:flex items-center text-sm">
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-muted-foreground">/</span>}
                <span
                  className={
                    index === breadcrumb.length - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-primary cursor-pointer"
                  }
                >
                  {item}
                </span>
              </span>
            ))}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 text-sm rounded-md border border-input bg-background w-48 focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
          />
        </div>

        <button className="relative p-2 hover:bg-muted rounded-md transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-muted rounded-md px-2 py-1.5 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">{initial}</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground">{displayName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>My Profile</DropdownMenuItem>
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
