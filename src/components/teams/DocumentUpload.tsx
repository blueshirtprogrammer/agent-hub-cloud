import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DOCUMENT_TYPES = [
  { value: "form_6", label: "Form 6 - Appointment of Real Estate Agent" },
  { value: "rates_notice", label: "Rates Notice" },
  { value: "tenancy_agreement", label: "Tenancy Agreement" },
  { value: "key_record", label: "Key Record" },
  { value: "title_search", label: "Title Search" },
  { value: "contract_draft", label: "Contract Draft" }
] as const;

export const DocumentUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedType, setSelectedType] = useState<string>(DOCUMENT_TYPES[0].value);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (file.size > maxSize) {
      setError("File size must be less than 10MB");
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, DOC, DOCX, and TXT files are allowed");
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setSelectedFile(file);
      } else {
        event.target.value = '';
        setSelectedFile(null);
      }
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `${selectedType}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('process_documents')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Create document analysis record
      const { error: dbError } = await supabase
        .from('document_analysis')
        .insert({
          file_name: selectedFile.name,
          file_path: filePath,
          status: 'pending',
          document_type: selectedType
        });

      if (dbError) throw dbError;

      // Trigger analysis
      const { error: analysisError } = await supabase.functions.invoke('analyze-process-document', {
        body: { filePath, documentType: selectedType }
      });

      if (analysisError) throw analysisError;

      // Set progress to 100% when upload is complete
      clearInterval(progressInterval);
      setUploadProgress(100);

      toast({
        title: "Document uploaded successfully",
        description: "The document is being analyzed. This may take a few moments.",
      });

      // Reset form
      setSelectedFile(null);
      if (event.target instanceof HTMLInputElement) {
        event.target.value = '';
      }
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message || "There was an error uploading your document");
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
            Upload your real estate documents to automatically process and analyze them.
            Supported formats: PDF, DOC, DOCX, TXT. Maximum file size: 10MB.
          </p>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Select
            value={selectedType}
            onValueChange={setSelectedType}
            disabled={isUploading}
          >
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {DOCUMENT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                disabled={isUploading}
                className="max-w-md"
              />
              <Button 
                onClick={handleFileUpload}
                disabled={isUploading || !selectedFile}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full max-w-md" />
                <p className="text-sm text-muted-foreground">
                  {uploadProgress < 100 
                    ? "Uploading and analyzing document..." 
                    : "Upload complete! Finalizing analysis..."}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};