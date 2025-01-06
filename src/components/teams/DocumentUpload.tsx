import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText } from "lucide-react";

export const DocumentUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('process_documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create document analysis record
      const { error: dbError } = await supabase
        .from('document_analysis')
        .insert({
          file_name: file.name,
          file_path: filePath,
          status: 'pending'
        });

      if (dbError) throw dbError;

      // Trigger analysis
      const { error: analysisError } = await supabase.functions.invoke('analyze-process-document', {
        body: { filePath }
      });

      if (analysisError) throw analysisError;

      toast({
        title: "Document uploaded successfully",
        description: "The document is being analyzed. This may take a few moments.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Upload Process Document
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload your sales automation process document to automatically configure teams and tasks.
          </p>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="max-w-md"
            />
            <Button disabled={isUploading}>
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};