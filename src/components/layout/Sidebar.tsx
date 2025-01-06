import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BrainCircuit,
  ClipboardList,
  Home,
  Settings,
  CreditCard,
  FileText,
  Book,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Agents", path: "/agents" },
  { icon: BrainCircuit, label: "Teams", path: "/teams" },
  { icon: ClipboardList, label: "Tasks", path: "/tasks" },
  { icon: Home, label: "Properties", path: "/properties" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: CreditCard, label: "Resources", path: "/resources" },
  { icon: Book, label: "Project Brief", path: "/brief" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center px-6">
          <h2 className="text-lg font-semibold">AI Agent Hub</h2>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                  isActive ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};