import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Camera } from "lucide-react";
import html2canvas from "html2canvas";

export const UXAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const captureAndAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      // Capture the main content area
      const mainContent = document.querySelector('main');
      if (!mainContent) {
        throw new Error('Could not find main content element');
      }

      const canvas = await html2canvas(mainContent);
      const imageData = canvas.toDataURL('image/png');

      // Get current route context
      const path = window.location.pathname;
      const context = `This is the ${path.replace('/', '')} page of our real estate agent management platform.`;

      const { data, error } = await supabase.functions.invoke('ux-design-agent', {
        body: { imageData, context }
      });

      if (error) throw error;

      setAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: "UX/UI analysis has been generated successfully.",
      });
    } catch (error) {
      console.error('Error:', error);
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
        <CardTitle>UX/UI Analysis</CardTitle>
        <CardDescription>
          Analyze the current interface for UX/UI improvements and best practices
        </CardDescription>
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
              <>
                <Camera className="mr-2 h-4 w-4" />
                Analyze Current View
              </>
            )}
          </Button>

          {analysis && (
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="font-medium mb-2">Overall Assessment</h3>
                <p className="text-sm text-muted-foreground">{analysis.overall_assessment}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Strengths</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {analysis.strengths.map((strength: string, index: number) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Areas for Improvement</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {analysis.areas_for_improvement.map((area: string, index: number) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Priority Changes</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {analysis.priority_changes.map((change: string, index: number) => (
                    <li key={index}>{change}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};