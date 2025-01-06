import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Clock, CreditCard } from "lucide-react";

interface TeamResourcesProps {
  computeCredits: number;
  serverHours: number;
  billingTier: string;
}

export const TeamResources = ({ computeCredits, serverHours, billingTier }: TeamResourcesProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card hover:bg-accent/5 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Cpu className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compute Credits</p>
                <p className="text-2xl font-bold text-primary mt-1">{computeCredits.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Available for processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:bg-accent/5 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Server Hours</p>
                <p className="text-2xl font-bold text-primary mt-1">{serverHours.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Runtime remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:bg-accent/5 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Billing Tier</p>
                <p className="text-2xl font-bold text-primary mt-1 capitalize">{billingTier}</p>
                <p className="text-xs text-muted-foreground mt-1">Current subscription</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};