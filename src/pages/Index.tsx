import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Brain, ListTodo, Home } from "lucide-react";

const stats = [
  {
    title: "Active Agents",
    value: "12",
    icon: Users,
    change: "+2",
  },
  {
    title: "Teams",
    value: "4",
    icon: Brain,
    change: "+1",
  },
  {
    title: "Active Tasks",
    value: "28",
    icon: ListTodo,
    change: "+5",
  },
  {
    title: "Properties",
    value: "156",
    icon: Home,
    change: "+12",
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your AI Agent Management Platform
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;