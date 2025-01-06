import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { agentService } from "@/services/AgentService";
import { Lightbulb, Mail, FileSpreadsheet } from "lucide-react";

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

  const examples = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Integration",
      description: "Connect our sales team's emails to generate weekly reports for the director",
      prompt: "Connect our sales team's emails to generate weekly reports for the director summarizing important emails from Monday to Friday"
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5" />,
      title: "Spreadsheet Automation",
      description: "Sync property data from our CRM to Google Sheets daily",
      prompt: "Create a daily sync between our CRM and a Google Sheet to track all new property listings and their status"
    }
  ];

  const handleExampleClick = (prompt: string) => {
    setDescription(prompt);
  };

  return (
    <div className="space-y-6">
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
              placeholder="Describe what you want to integrate (e.g., 'Connect our sales team's emails to generate weekly reports for the director')"
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

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-muted-foreground" />
            <CardTitle>Example Integrations</CardTitle>
          </div>
          <CardDescription>
            Click on any example to see how to describe your integration needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {examples.map((example, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleExampleClick(example.prompt)}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {example.icon}
                    <CardTitle className="text-base">{example.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {example.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};