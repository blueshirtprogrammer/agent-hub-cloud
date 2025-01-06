import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { agentService } from "@/services/AgentService";
import { 
  Lightbulb, Mail, FileSpreadsheet, Camera, Calendar, 
  FileText, Home, ClipboardCheck, Key, MessageSquare 
} from "lucide-react";

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
      icon: <FileText className="w-5 h-5" />,
      title: "Form 6 Document Flow",
      description: "Automate Form 6 processing and document collection",
      prompt: "Create a workflow to collect and process Form 6, rates notices, and tenancy agreements. Automatically notify when documents are received and store them in our system."
    },
    {
      icon: <Camera className="w-5 h-5" />,
      title: "Photography Scheduling",
      description: "Coordinate photographer and inspection bookings",
      prompt: "Connect our photographer's Acuity Scheduling calendar with our inspection manager's availability to automatically schedule property photos and virtual tours."
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Open Home Automation",
      description: "Manage open home scheduling and notifications",
      prompt: "Automate open home scheduling based on inspection manager availability, send Form 9 notices to tenants, and manage visitor registrations."
    },
    {
      icon: <Home className="w-5 h-5" />,
      title: "Portal Listing Sync",
      description: "Synchronize property listings across platforms",
      prompt: "Automatically sync property details, photos, and virtual tours from our CRM to all advertising portals and generate QR-coded flyers for the offer system."
    },
    {
      icon: <ClipboardCheck className="w-5 h-5" />,
      title: "Offer System Integration",
      description: "Connect offer system with notifications",
      prompt: "Set up automated notifications for sellers when offers are received, integrate with DocuSign for contracts, and manage the countdown timer system for offers."
    },
    {
      icon: <Key className="w-5 h-5" />,
      title: "Settlement Coordination",
      description: "Automate settlement process tasks",
      prompt: "Create a workflow to generate tax invoices, schedule pre-settlement inspections, and notify all parties of important settlement dates and tasks."
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Buyer Communication",
      description: "Automate buyer response system",
      prompt: "Set up automated responses to buyer enquiries with property information, upcoming open home times, and registration links for the offer system."
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Document Distribution",
      description: "Automate document sharing with parties",
      prompt: "Automatically distribute required documents to buyers upon registration, including title searches, contracts, and property reports."
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
              placeholder="Describe what you want to integrate (e.g., 'Automate Form 6 processing and document collection workflow')"
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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