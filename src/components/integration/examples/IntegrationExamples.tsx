import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, FileText, Camera, Calendar, Home, ClipboardCheck, Key, MessageSquare, Mail } from "lucide-react";

export type IntegrationExample = {
  icon: React.ReactNode;
  title: string;
  description: string;
  prompt: string;
};

export const integrationExamples: IntegrationExample[] = [
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

interface IntegrationExamplesProps {
  onExampleClick: (prompt: string) => void;
}

export const IntegrationExamples: React.FC<IntegrationExamplesProps> = ({ onExampleClick }) => {
  return (
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
          {integrationExamples.map((example, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => onExampleClick(example.prompt)}
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
  );
};