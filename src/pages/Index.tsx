import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Brain, ListTodo, Home } from "lucide-react";
import { Agent, Task } from "@/types/agents";
import { agentService } from "@/services/AgentService";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize some default agents
    if (agentService.getAgents().length === 0) {
      agentService.createAgent("WebBot", "BROWSER_AGENT", ["browser_control", "screenshot"]);
      agentService.createAgent("VisionBot", "VISION_AGENT", ["vision", "ocr"]);
      agentService.createAgent("DataBot", "DATA_AGENT", ["data_processing", "database"]);
    }
    
    updateAgentsAndTasks();
  }, []);

  const updateAgentsAndTasks = () => {
    setAgents(agentService.getAgents());
    setTasks(agentService.getTasks());
  };

  const handleCreateTask = async () => {
    try {
      const task = await agentService.createTask(
        "Research properties on domain.com.au listed for more than 55 days",
        "high"
      );
      updateAgentsAndTasks();
      
      toast({
        title: "Task Created",
        description: `New task created and assigned to ${task.assignedAgents.length} agents`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      title: "Active Agents",
      value: agents.length.toString(),
      icon: Users,
      change: "+2",
    },
    {
      title: "Teams",
      value: agentService.getTeams().length.toString(),
      icon: Brain,
      change: "+1",
    },
    {
      title: "Active Tasks",
      value: tasks.filter(t => t.status === 'in_progress').length.toString(),
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              AI Agent Management Platform
            </p>
          </div>
          <Button onClick={handleCreateTask}>Create Sample Task</Button>
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

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.role}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      agent.status === 'idle' ? 'bg-green-100 text-green-800' :
                      agent.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{task.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Assigned: {task.assignedAgents.map(a => a.name).join(', ')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      task.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;