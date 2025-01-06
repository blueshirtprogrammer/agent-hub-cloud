import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, CheckCircle2, Clock, ListTodo } from "lucide-react";

interface TaskWithAgent extends Task {
  agents: {
    name: string;
    role: string;
  } | null;
}

interface Task {
  id: string;
  task_type: string;
  status: string;
  due_date: string;
  completed_at: string | null;
  metadata: any;
  listing_id: string;
  assigned_to: string;
}

export const Tasks = () => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listing_tasks')
        .select(`
          *,
          agents:assigned_to (
            name,
            role
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as TaskWithAgent[];
    }
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Tasks</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-32" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <div className="flex gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-semibold">{tasks?.length || 0}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-semibold">
                  {tasks?.filter(t => t.status === 'completed').length || 0}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks?.map((task: TaskWithAgent) => (
          <Card key={task.id} className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10">
                      {task.agents?.name?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{task.task_type}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Assigned to: {task.agents?.name || 'Unassigned'}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="secondary"
                  className={`${getStatusColor(task.status)} text-white`}
                >
                  {task.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {task.due_date && (
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                  </div>
                )}
                {task.completed_at && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Completed: {new Date(task.completed_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              {task.metadata && task.metadata.description && (
                <p className="mt-2 text-sm">{task.metadata.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};