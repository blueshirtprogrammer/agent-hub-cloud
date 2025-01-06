import React, { useEffect } from "react";
import { captureAndAnalyzeScreenshot } from "@/utils/screenshotAnalysis";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { Task } from "@/types/tasks";

export const Tasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetchTasks();
    const analyzePage = async () => {
      try {
        const result = await captureAndAnalyzeScreenshot();
        console.log('Tasks analysis:', result);
        
        if (!result.error) {
          toast({
            title: "UX Analysis Complete",
            description: "The tasks page has been analyzed for UX improvements.",
          });
        }
      } catch (error) {
        console.error('Error analyzing tasks:', error);
      }
    };

    analyzePage();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match the Task interface
      const transformedTasks: Task[] = (data || []).map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || null,
        priority: (task.priority as Task['priority']) || 'medium',
        due_date: task.due_date || null,
        status: (task.status as Task['status']) || 'pending',
        created_at: task.created_at || null,
        updated_at: task.updated_at || null
      }));

      setTasks(transformedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tasks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm onTaskCreated={fetchTasks} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList tasks={tasks} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
};