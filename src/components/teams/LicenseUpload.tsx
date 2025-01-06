import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const LicenseUpload = () => {
  const { toast } = useToast();
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `licenses/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property_documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      toast({
        title: "License uploaded successfully",
        description: "Your license has been uploaded and will be verified shortly."
      });

      setFile(null);
    } catch (error) {
      console.error('Error uploading license:', error);
      toast({
        title: "Error",
        description: "Failed to upload license. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">License Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="flex-1"
          />
          <Button
            onClick={handleUpload}
            disabled={!file}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Upload your real estate license and other compliance documents.
          Supported formats: PDF, JPG, PNG
        </p>
      </CardContent>
    </Card>
  );
};