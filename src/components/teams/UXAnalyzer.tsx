import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { captureAndAnalyzeScreenshot } from "@/utils/screenshotAnalysis";

export const UXAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      const result = await captureAndAnalyzeScreenshot();
      
      if (result.error) {
        throw new Error(result.error);
      }

      setAnalysis(result.analysis);
      toast({
        title: "Analysis Complete",
        description: "UX/UI analysis has been generated successfully.",
      });
    } catch (error) {
      console.error('Error analyzing interface:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to analyze interface. Please try again.",
        variant: "destructive",
      });
      setAnalysis(null);
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
            onClick={handleAnalyze} 
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