import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface WorkflowStage {
  name: string;
  title: string;
  required_documents: string[];
}

interface WorkflowStagesProps {
  stages: WorkflowStage[];
}

export const WorkflowStages = ({ stages }: WorkflowStagesProps) => {
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
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                </div>
              </div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};