import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';
import { supabase } from "@/integrations/supabase/client";

export const UXAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const captureAndAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      
      // Capture the entire page
      const canvas = await html2canvas(document.body);
      const screenshot = canvas.toDataURL('image/png');

      // Call the edge function
      const { data: { analysis: result }, error } = await supabase.functions.invoke('analyze-interface', {
        body: { screenshot, context: 'teams-page' },
      });

      if (error) throw error;

      setAnalysis(result);
      toast({
        title: "Analysis Complete",
        description: "UX/UI analysis has been generated successfully.",
      });
    } catch (error) {
      console.error('Error analyzing interface:', error);
      toast({
        title: "Error",
        description: "Failed to analyze interface",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          UX/UI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={captureAndAnalyze} 
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Interface...
              </>
            ) : (
              'Analyze Current Interface'
            )}
          </Button>

          {analysis && (
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="space-y-4">
                {analysis.split('\n').map((line, index) => (
                  <p key={index} className="text-sm">
                    {line}
                  </p>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
};