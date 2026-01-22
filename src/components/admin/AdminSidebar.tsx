import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Hotel,
  Umbrella,
  Car,
  FileText,
  Star,
  Compass,
  Camera,
  Plane,
  Image,
  Percent,
  FileImage,
  Settings,
  FileCode,
  Home,
  Globe,
  ChevronDown,
  ChevronRight,
  BarChart3,
  CalendarDays,
  Mail,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: { label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Bookings", icon: CalendarDays, path: "/bookings" },
  { label: "Locations", icon: MapPin, path: "/locations" },
  { label: "Hotels", icon: Hotel, path: "/hotels" },
  {
    label: "Holidays",
    icon: Umbrella,
    children: [
      { label: "All Holidays", path: "/holidays" },
      { label: "Add Holiday", path: "/holidays/add" },
    ],
  },
  {
    label: "Rent Cars",
    icon: Car,
    children: [
      { label: "All Cars", path: "/cars" },
      { label: "Add Car", path: "/cars/add" },
    ],
  },
  {
    label: "Blogs",
    icon: FileText,
    children: [
      { label: "All Blogs", path: "/blogs" },
      { label: "Add Blog", path: "/blogs/add" },
    ],
  },
  {
    label: "Reviews",
    icon: Star,
    children: [
      { label: "All Reviews", path: "/reviews" },
      { label: "Pending", path: "/reviews/pending" },
    ],
  },
  {
    label: "Tours",
    icon: Compass,
    children: [
      { label: "All Tours", path: "/tours" },
      { label: "Add Tour", path: "/tours/add" },
      { label: "Edit Tour", path: "/tours/edit" },
    ],
  },
  { label: "Things To Do", icon: Camera, path: "/things-to-do" },
  {
    label: "Visa",
    icon: Plane,
    children: [
      { label: "All Visas", path: "/visa" },
      { label: "Applications", path: "/visa/applications" },
    ],
  },
  { label: "Gallery", icon: Image, path: "/gallery" },
  { label: "Discounts", icon: Percent, path: "/discounts" },
  { label: "Icon Pages", icon: FileImage, path: "/icon-pages" },
  { label: "Tour Settings", icon: Settings, path: "/tour-settings" },
  { label: "Footer Settings", icon: FileCode, path: "/footer-settings" },
  { label: "Homepage Settings", icon: Home, path: "/homepage-settings" },
  { label: "Site Settings", icon: Globe, path: "/site-settings" },
  { label: "Email Templates", icon: Mail, path: "/email-templates" },
  { label: "ROAI Calculator", icon: BarChart3, path: "/roai" },
];

interface AdminSidebarProps {
  isOpen: boolean;
}

export function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Tours"]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (children?: { path: string }[]) =>
    children?.some((child) => location.pathname === child.path);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-sidebar z-40 transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 -translate-x-full lg:w-64 lg:translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Brand */}
        <div className="h-16 flex items-center px-5 border-b border-white/10">
          <h1 className="text-lg font-bold text-white tracking-wide">
            BetterView Tour
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto sidebar-scroll">
          <ul className="space-y-0.5 px-3">
            {menuItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                        isParentActive(item.children)
                          ? "bg-sidebar-active text-white"
                          : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {expandedItems.includes(item.label) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {expandedItems.includes(item.label) && (
                      <ul className="mt-1 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <NavLink
                              to={child.path}
                              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                                isActive(child.path)
                                  ? "bg-primary text-primary-foreground"
                                  : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-white"
                              }`}
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path!}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path!)
                        ? "bg-primary text-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-sidebar-foreground text-center">
            Copyright © 2014-2026
          </p>
          <p className="text-xs text-sidebar-foreground text-center mt-1">
            Version 2.4.0
          </p>
        </div>
      </div>
    </aside>
  );
}
