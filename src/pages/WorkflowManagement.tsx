import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { WorkflowStages } from "@/components/workflow/WorkflowStages";
import { DocumentRequirements } from "@/components/workflow/DocumentRequirements";
import { supabase } from "@/integrations/supabase/client";

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string | null;
  stages: {
    name: string;
    title: string;
    required_documents: string[];
  }[];
  required_documents: string[];
}

export const WorkflowManagement = () => {
  const { data: workflow, isLoading } = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .eq('name', 'Form 6 to Settlement')
        .single();

      if (error) throw error;
      
      // Cast the JSON data to the correct type
      const typedData = {
        ...data,
        stages: data.stages as WorkflowTemplate['stages'],
        required_documents: data.required_documents as string[]
      } as WorkflowTemplate;

      return typedData;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Workflow Stages</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <WorkflowStages stages={workflow?.stages || []} />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <DocumentRequirements documents={workflow?.required_documents || []} />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};