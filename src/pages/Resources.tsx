import React, { useEffect } from "react";
import { captureAndAnalyzeScreenshot } from "@/utils/screenshotAnalysis";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamResources } from "@/components/teams/TeamResources";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Cpu, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Zap,
  BarChart3,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Resource Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and optimize your resource utilization
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          View Usage Trends
        </Button>
      </div>

      {analysis && (
        <Card className="border-2 border-primary/10 shadow-lg bg-card">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              UX Analysis Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded-md">
              <div className="space-y-2 p-4">
                {analysis.split('\n').map((line, index) => (
                  <p key={index} className="text-sm text-card-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <CardTitle>Resource Overview</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <Clock className="h-4 w-4" />
                Last 30 Days
              </Button>
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

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Team Utilization</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Active Users</span>
                  <span className="text-sm text-muted-foreground">12/15</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '80%' }} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Your team is operating at optimal capacity
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <CardTitle>System Performance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">API Response Time</span>
                  <span className="text-sm text-muted-foreground">125ms avg</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '90%' }} />
                </div>
                <p className="text-sm text-muted-foreground">
                  System performance is within optimal range
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};