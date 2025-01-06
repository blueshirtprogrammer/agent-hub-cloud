import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface WorkflowStage {
  name: string;
  title: string;
  required_documents: string[];
}

interface WorkflowStagesProps {
  stages: WorkflowStage[];
}

export const WorkflowStages = ({ stages }: WorkflowStagesProps) => {
  const { data: workflowStatus } = useQuery({
    queryKey: ['workflow-status'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listing_workflow_stages')
        .select('*');

      if (error) throw error;
      return data;
    },
  });

  const getStageStatus = (stageName: string) => {
    const stage = workflowStatus?.find(s => s.stage_name === stageName);
    return stage?.status || 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => (
        <Card key={stage.name}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{stage.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {stage.required_documents.length} required documents
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">Stage {index + 1}</Badge>
                  <Badge variant="secondary">
                    {getStageStatus(stage.name) === 'completed' ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </>
                    ) : getStageStatus(stage.name) === 'in_progress' ? (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        In Progress
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                </div>
              </div>
              {getStatusIcon(getStageStatus(stage.name))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};