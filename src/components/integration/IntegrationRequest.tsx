import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { agentService } from "@/services/AgentService";
import { IntegrationExamples } from "./examples/IntegrationExamples";
import { PlatformIntegrations } from "./platforms/PlatformIntegrations";
import { Loader2 } from "lucide-react";

export const IntegrationRequest = () => {
  const [description, setDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const result = await agentService.analyzeIntegrationRequest(description);
      
      toast({
        title: "Integration Request Submitted",
        description: `Task created and assigned to ${result.task.assignedAgents[0].name}`,
      });
      
      setDescription("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process integration request",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExampleClick = (prompt: string) => {
    setDescription(prompt);
  };

  const handlePlatformToggle = (platformIndex: number, integrationIndex: number) => {
    toast({
      title: "Integration Status Updated",
      description: "Your integration preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <PlatformIntegrations onPlatformToggle={handlePlatformToggle} />

      <Card>
        <CardHeader>
          <CardTitle>Describe Your Integration Needs</CardTitle>
          <CardDescription>
            Tell us what you want to integrate in plain English, and our AI team will handle the implementation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Describe what you want to integrate (e.g., 'Automate Form 6 processing and document collection workflow')"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              type="submit" 
              disabled={isProcessing || !description.trim()}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <IntegrationExamples onExampleClick={handleExampleClick} />
    </div>
  );
};