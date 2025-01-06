import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { agentService } from "@/services/AgentService";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Describe Your Integration Needs</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Describe what you want to integrate in plain English (e.g., 'Connect our sales team's emails to generate weekly reports for the director')"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={isProcessing || !description.trim()}>
            {isProcessing ? "Processing..." : "Submit Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};