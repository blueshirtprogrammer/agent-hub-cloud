import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Building, Globe, CalendarDays, Workflow } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type Platform = {
  name: string;
  enabled: boolean;
};

export type IntegrationPlatform = {
  icon: React.ReactNode;
  title: string;
  description: string;
  platforms: Platform[];
  prompt: string;
};

export const platformIntegrations: IntegrationPlatform[] = [
  {
    icon: <Building className="w-5 h-5" />,
    title: "CRM Integration Hub",
    description: "Connect with popular real estate CRMs",
    platforms: [
      { name: "Hubspot", enabled: false },
      { name: "High Level", enabled: false },
      { name: "Eagle CRM", enabled: false },
      { name: "REI Master", enabled: false }
    ],
    prompt: "Set up automated data sync between our selected CRM and other integrated systems"
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Property Portal Sync",
    description: "Sync with major property portals",
    platforms: [
      { name: "realestate.com.au", enabled: false },
      { name: "domain.com.au", enabled: false },
      { name: "MLS Connect", enabled: false }
    ],
    prompt: "Configure automated listing syndication to selected property portals with status tracking"
  },
  {
    icon: <CalendarDays className="w-5 h-5" />,
    title: "Calendar Systems",
    description: "Integrate with calendar platforms",
    platforms: [
      { name: "Google Calendar", enabled: false },
      { name: "Cal.com", enabled: false },
      { name: "Microsoft Calendar", enabled: false }
    ],
    prompt: "Synchronize appointments and scheduling across selected calendar platforms"
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "Automation Platforms",
    description: "Connect with workflow automation tools",
    platforms: [
      { name: "Make.com", enabled: false },
      { name: "Zapier", enabled: false },
      { name: "Direct API", enabled: false }
    ],
    prompt: "Generate and export automation workflows to selected platforms"
  }
];

interface PlatformIntegrationsProps {
  onPlatformToggle: (platformIndex: number, integrationIndex: number) => void;
}

export const PlatformIntegrations: React.FC<PlatformIntegrationsProps> = ({ onPlatformToggle }) => {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Integrations</CardTitle>
        <CardDescription>
          Enable or disable integrations with various platforms and services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {platformIntegrations.map((integration, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {integration.icon}
                  <CardTitle className="text-base">{integration.title}</CardTitle>
                </div>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integration.platforms.map((platform, platformIdx) => (
                    <div key={platformIdx} className="flex items-center justify-between">
                      <span className="text-sm">{platform.name}</span>
                      <Switch
                        checked={platform.enabled}
                        onCheckedChange={() => onPlatformToggle(platformIdx, idx)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};