import React from "react";
import { Link } from "react-router-dom";
import { Home, Settings, Users, FileText, ListChecks, Building } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 bottom-0 bg-background border-r">
      <div className="p-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          to="/properties"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Building className="h-4 w-4" />
          Properties
        </Link>
        <Link
          to="/tasks"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <FileText className="h-4 w-4" />
          Tasks
        </Link>
        <Link
          to="/team"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Users className="h-4 w-4" />
          Team
        </Link>
        <Link
          to="/workflow"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <ListChecks className="h-4 w-4" />
          Workflow Management
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>
    </aside>
  );
};