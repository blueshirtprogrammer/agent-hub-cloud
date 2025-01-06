import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamResources } from "@/components/teams/TeamResources";
import { Cpu, CreditCard } from "lucide-react";

export const Resources = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Resources & Billing</h1>
      </div>

      <div className="grid gap-6">
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