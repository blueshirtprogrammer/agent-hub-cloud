import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Document {
  name: string;
  path: string;
  type: string;
  uploadedAt: string;
}

export const DocumentViewer = () => {
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      // Fetch from all document buckets
      const [processDocsRes, propertyDocsRes, listingDocsRes] = await Promise.all([
        supabase.storage.from('process_documents').list(),
        supabase.storage.from('property_documents').list(),
        supabase.storage.from('listing_documents').list(),
      ]);

      const allDocs = [
        ...(processDocsRes.data || []).map(doc => ({
          name: doc.name,
          path: doc.name,
          type: 'process',
          uploadedAt: doc.created_at || new Date().toISOString()
        })),
        ...(propertyDocsRes.data || []).map(doc => ({
          name: doc.name,
          path: doc.name,
          type: 'property',
          uploadedAt: doc.created_at || new Date().toISOString()
        })),
        ...(listingDocsRes.data || []).map(doc => ({
          name: doc.name,
          path: doc.name,
          type: 'listing',
          uploadedAt: doc.created_at || new Date().toISOString()
        }))
      ];

      setDocuments(allDocs);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to fetch documents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadDocument = async (doc: Document) => {
    try {
      const bucketName = doc.type === 'process' ? 'process_documents' : 
                        doc.type === 'property' ? 'property_documents' : 
                        'listing_documents';

      // Get the download URL
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(doc.path);

      // Fetch the file using the public URL
      const response = await fetch(data.publicUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Document downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  };

  const deleteDocument = async (doc: Document) => {
    try {
      const bucketName = doc.type === 'process' ? 'process_documents' : 
                        doc.type === 'property' ? 'property_documents' : 
                        'listing_documents';

      const { error } = await supabase.storage
        .from(bucketName)
        .remove([doc.path]);

      if (error) throw error;

      setDocuments(prev => prev.filter(d => d.path !== doc.path));
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">No documents found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.path}
                  className="flex items-center justify-between p-2 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Type: {doc.type} • Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => downloadDocument(doc)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteDocument(doc)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};