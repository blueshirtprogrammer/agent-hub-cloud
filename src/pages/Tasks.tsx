import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { agentService } from "@/services/AgentService";

export const Tasks = () => {
  const tasks = agentService.getTasks();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Tasks</h1>
      
      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{task.description}</CardTitle>
                <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                  {task.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Priority: {task.priority}
                </p>
                <p className="text-sm">
                  Assigned Agents: {task.assignedAgents.length}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};