import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, AlertCircle } from "lucide-react";
import { WorkflowStages } from "@/components/workflow/WorkflowStages";
import { DocumentRequirements } from "@/components/workflow/DocumentRequirements";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

interface WorkflowStage {
  name: string;
  title: string;
  required_documents: string[];
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  required_documents: string[];
}

export const WorkflowManagement = () => {
  const { data: workflow, isLoading, error } = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .eq('name', 'Form 6 to Settlement')
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Workflow template not found');
      
      // First cast to unknown, then to our expected type to safely handle the JSON conversion
      const stages = (data.stages as unknown) as WorkflowStage[];
      const requiredDocs = (data.required_documents as unknown) as string[];
      
      // Construct the template with proper type casting
      const template: WorkflowTemplate = {
        id: data.id,
        name: data.name,
        description: data.description,
        stages: stages,
        required_documents: requiredDocs
      };

      return template;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load workflow template. Please try again later.
          </AlertDescription>
        </Alert>
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