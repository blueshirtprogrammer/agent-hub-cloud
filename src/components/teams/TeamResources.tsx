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
    <div>
      <h3 className="text-sm font-medium mb-4">Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Compute Credits</p>
              <p className="text-2xl font-bold">{computeCredits}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Server Hours</p>
              <p className="text-2xl font-bold">{serverHours}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Billing Tier</p>
              <p className="text-2xl font-bold capitalize">{billingTier}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};