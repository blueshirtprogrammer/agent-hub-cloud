import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, Upload, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DocumentRequirementsProps {
  documents: string[];
}

interface DocumentAnalysis {
  id: string;
  file_name: string;
  status: string;
  file_path: string;
}

export const DocumentRequirements = ({ documents }: DocumentRequirementsProps) => {
  const { data: analysisData } = useQuery({
    queryKey: ['document-analysis'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_analysis')
        .select('*');

      if (error) throw error;
      return data as DocumentAnalysis[];
    },
  });

  const getDocumentStatus = (document: string) => {
    const analysis = analysisData?.find(a => 
      a.file_name.toLowerCase().includes(document.toLowerCase())
    );
    return analysis?.status || 'pending';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Required
          </Badge>
        );
    }
  };

  const handleUpload = (document: string) => {
    // This will be connected to the DocumentUpload component
    console.log("Upload document:", document);
  };

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <Card key={document} className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">
                    {document.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </h3>
                </div>
                {getStatusBadge(getDocumentStatus(document))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleUpload(document)}
                className="ml-4"
              >
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