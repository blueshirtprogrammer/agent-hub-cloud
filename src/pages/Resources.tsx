import React, { useEffect } from "react";
import { captureAndAnalyzeScreenshot } from "@/utils/screenshotAnalysis";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamResources } from "@/components/teams/TeamResources";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cpu, CreditCard } from "lucide-react";

export const Resources = () => {
  const { toast } = useToast();
  const [analysis, setAnalysis] = React.useState<string | null>(null);

  useEffect(() => {
    const analyzePage = async () => {
      try {
        const result = await captureAndAnalyzeScreenshot();
        console.log('Resources analysis:', result);
        
        if (!result.error && result.analysis) {
          setAnalysis(result.analysis);
          toast({
            title: "UX Analysis Complete",
            description: "The resources page has been analyzed for UX improvements.",
          });
        }
      } catch (error) {
        console.error('Error analyzing resources:', error);
        toast({
          title: "Analysis Error",
          description: "Failed to analyze the interface. Please try again.",
          variant: "destructive",
        });
      }
    };

    analyzePage();
  }, [toast]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Resources & Billing</h1>
      </div>

      <div className="grid gap-6">
        {analysis && (
          <Card className="border-2 border-primary/10 shadow-lg">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg font-semibold">UX Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-md">
                <div className="space-y-2 p-4">
                  {analysis.split('\n').map((line, index) => (
                    <p key={index} className="text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Billing Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <TeamResources
              computeCredits={5000}
              serverHours={200}
              billingTier="pro"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};