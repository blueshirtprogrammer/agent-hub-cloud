import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, Upload } from "lucide-react";

interface DocumentRequirementsProps {
  documents: string[];
}

export const DocumentRequirements = ({ documents }: DocumentRequirementsProps) => {
  const handleUpload = (document: string) => {
    // TODO: Implement document upload functionality
    console.log("Upload document:", document);
  };

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <Card key={document}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{document.replace(/_/g, ' ').toUpperCase()}</h3>
                <Badge variant="secondary" className="mt-2">
                  <Clock className="h-3 w-3 mr-1" />
                  Required
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleUpload(document)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};